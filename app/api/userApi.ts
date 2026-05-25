import authorizedApiClient from "@/app/api/authorizedApiClient";
import { handleAsync } from "@/app/utils/handleAsyncContext";
import { getUserIdFromCookie } from "@/app/utils/tokenStorage";
import { showToast } from "@/lib/toast";

//API get detail user
export const getUserProfile = async () => {
  const userId = getUserIdFromCookie();
  const { data, error } = await handleAsync(() =>
    authorizedApiClient().get(`/users/${userId}`).then(res => res)
  );
  return { data, error };
};

// API update user
export const updateProfile = async (id: number, userData: { avatar: string; name: string }) => {
  const { data, error } = await handleAsync(() =>
    authorizedApiClient()
      .patch(`/users/${id}`, userData)
      .then(res => res)
  );

  if (data) {
    showToast("success", "Updated profile successful!");
  } else {
    showToast(
      "error",
      error instanceof Error ? error.message : "Updated profile failed!"
    );
  }

  return { data, error };
};

