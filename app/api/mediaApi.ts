import authorizedApiClient from "@/app/api/authorizedApiClient";
import { handleAsync } from "@/app/utils/handleAsyncContext";
import { showToast } from "@/lib/toast";

interface MediaUploadResponse {
  url: string;
}

export const uploadMedia = async (file: File): Promise<{ data: MediaUploadResponse | null; error: string | null }> => {
  const formData = new FormData();
  formData.append("file", file);
  const { data, error } = await handleAsync(() =>
    authorizedApiClient().post("/media/upload", formData, true).then(res => res)
  );
  if (data) {
    showToast("success", "Upload media successful!");
  } else {
    showToast(
      "error", error instanceof Error ? error.message : "Upload media failed!"
    );
  }
  return {
    data: data?.data || null,
    error: error instanceof Error ? error.message : (error as string | null)
  };
};

// Remove media
export const removeMedia = async (fileUrl: string) => {
  const { data, error } = await handleAsync(() =>
    authorizedApiClient().delete("/media/remove", { url: fileUrl }).then(res => res)
  );
  if (data) {
    showToast("success", "Remove media successful!");
  } else {
    showToast(
      "error", error instanceof Error ? error.message : "Remove media failed!"
    );
  }
  return { data, error };
};

