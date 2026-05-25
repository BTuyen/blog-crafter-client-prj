import apiClient from "@/app/utils/apiClient";
import { getRefreshToken, setAccessToken, clearTokens } from "@/app/utils/tokenStorage";
import { showToast } from "@/lib/toast";

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    showToast("error", "Không tìm thấy refresh token");
    return null;
  }

  try {
    const response = await apiClient.post("/auth/refresh-token", { refreshToken });

    if (response.data?.accessToken) {
      const newAccessToken = response.data.accessToken;
      setAccessToken(newAccessToken);
      return newAccessToken;
    } else {
      showToast("error", "Token refresh failed");
      clearTokens();
      return null;
    }
  } catch {
    showToast("error", "An error occurred while refreshing the token.");
    clearTokens();
    return null;
  }
};
