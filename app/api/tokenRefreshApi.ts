import apiClient from "@/app/utils/apiClient";
import { getRefreshToken, setAccessToken, clearTokens } from "@/app/utils/tokenStorage";
import { useUserStore } from "@/app/stores/useUserStore";
import { showToast } from "@/lib/toast";

const clearSession = () => {
  clearTokens();
  useUserStore.getState().setUser(null);
};

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    // Không show toast nếu user chưa từng login (không có user trong store)
    const wasLoggedIn = !!useUserStore.getState().user;
    if (wasLoggedIn) {
      clearSession();
      showToast("error", "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
    }
    return null;
  }

  try {
    const response = await apiClient.post("/auth/refresh-token", { refreshToken });

    // Backend bọc payload trong envelope { data: {...} } (xem authApi/authorizedApiClient).
    // Fallback về response.data phòng trường hợp trả phẳng.
    const payload = response.data?.data ?? response.data;
    const newAccessToken = payload?.accessToken;

    if (newAccessToken) {
      setAccessToken(newAccessToken);
      return newAccessToken;
    } else {
      clearSession();
      showToast("error", "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
      return null;
    }
  } catch {
    clearSession();
    showToast("error", "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
    return null;
  }
};
