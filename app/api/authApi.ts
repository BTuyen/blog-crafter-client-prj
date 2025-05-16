import apiClient from "@/app/utils/apiClient";
import { handleAsync } from "@/app/utils/handleAsyncContext";
import { showToast } from "@/lib/toast";

export const register = async (email: string, password: string) => {
  const { data, error } = await handleAsync(() =>
    apiClient.post("/auth/sign-up", { email, password }).then(res => res.data.data)
  );
  if (data) {
    showToast("success", "Registration successful!");
  } else {
    showToast("error", error instanceof Error ? error.message : "Registration failed. Please try again.");
  }
  return { data, error };
};

export const login = async (email: string, password: string) => {
  const { data, error } = await handleAsync(() =>
    apiClient.post("/auth/sign-in", { email, password }).then(res => res.data.data)
  );
  if (data) {
    showToast("success", "Login successful!");
  } else {
    showToast("error", error instanceof Error ? error.message : "Login failed. Please check your credentials.");
  }
  return { data, error };
};
