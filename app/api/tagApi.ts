import authorizedApiClient from "@/app/api/authorizedApiClient";
import apiClient from "@/app/utils/apiClient";
import { handleAsync } from "@/app/utils/handleAsyncContext";
import { showToast } from "@/lib/toast";

// API create tag
export const createTag = async (name: string, description: string) => {
  const { data, error } = await handleAsync(() =>
    authorizedApiClient().post("/tags/create", { name, description }).then(res => res)
  );
  if (error) {
    showToast(
      "error", error instanceof Error ? error.message : `Created #${name} failed!`
    );
  }
  return { data, error };
};

// API get list tag
export const getListTag = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const { data, error } = await handleAsync(() =>
    apiClient.get(`/tags?${queryString}`).then(res => res.data.data)
  );
  if (error) {
    showToast(
      "error", error instanceof Error ? error.message : `Fetching detail tag failed!`
    );
  }
  return { data, error };
};

// API tag detail
export const getTagDetail = async (id: number) => {
  const { data, error } = await handleAsync(() =>
    authorizedApiClient().get(`/tags/${id}`).then(res => res)
  );
  return { data, error };
};

// API tag detail theo slug (public — trả về tag trực tiếp)
export const getTagDetailBySlug = async (slug: string) => {
  const { data, error } = await handleAsync(() =>
    apiClient.get(`/tags/slug/${slug}`).then((res) => res.data.data)
  );
  if (error) {
    showToast(
      "error", error instanceof Error ? error.message : `Fetching tag failed!`
    );
  }
  return { data, error };
};

// API follow tag
export const followTag = async (id: number) => {
  const { data, error } = await handleAsync(() =>
    authorizedApiClient().post(`/tags/follow/${id}`, {}).then(res => res)
  );
  if (data) {
    showToast("success", "Follow tag successful!")
  } else {
    showToast(
      "error", error instanceof Error ? error.message : `Follow tag failed!`
    );
  }
  return { data, error };
};

// API unfollow tag
export const unFollowTag = async (id: number) => {
  const { data, error } = await handleAsync(() =>
    authorizedApiClient().post(`/tags/unfollow/${id}`, {}).then(res => res)
  );
  if (data) {
    showToast("success", "Unfollow tag successful!")
  } else {
    showToast(
      "error", error instanceof Error ? error.message : `Unfollow tag failed!`
    );
  }
  return { data, error };
};

// API get list tag followed
export const getListTagFollowed = async () => {
  const { data, error } = await handleAsync(() =>
    authorizedApiClient().get("/tags/followed").then(res => res)
  );
  return { data, error };
};

export const getFollowedTags = async () => {
  const { data, error } = await handleAsync(() =>
    authorizedApiClient().get("/tags/followed").then(res => res.data)
  );
  return { data, error };
};
