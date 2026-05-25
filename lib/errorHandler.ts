import { AxiosError } from "axios";
import { showToast } from "@/lib/toast";

export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || "Something went wrong!";
    showToast("error", message);
  } else {
    showToast("error", "An unexpected error occurred." as string);
  }
};

