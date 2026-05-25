import authorizedApiClient from "@/app/api/authorizedApiClient";
import apiClient from "@/app/utils/apiClient";
import { handleAsync } from "@/app/utils/handleAsyncContext";
import { showToast } from "@/lib/toast";

// API create blog
export const createBlog = async (blogData: FormData) => {
  const { data, error } = await handleAsync(() =>
    authorizedApiClient().post("/blogs/create", blogData, true).then(res => res)
  );

  if (data) {
    showToast("success", "Create blog successful!");
  } else {
    showToast(
      "error", error instanceof Error ? error.message : "Created blog failed!"
    );
  }
  return { data, error };
};

// API update blog
export const updateBlog = async (id: number, blogData: FormData) => {
  const { data, error } = await handleAsync(() =>
    authorizedApiClient().put(`/blogs/${id}`, blogData, true).then(res => res)
  );
  if (data) {
    showToast("success", "Updated blog successful!");
  } else {
    showToast(
      "error", error instanceof Error ? error.message : "Updated blog failed!"
    );
  }
  return { data, error };
};

// API delete blog
export const deleteBlog = async (id: number) => {
  const { data, error } = await handleAsync(() =>
    authorizedApiClient().delete(`/blogs/${id}`).then(res => res)
  );
  if (data) {
    showToast("success", "Updated blog successful!");
  } else {
    showToast(
      "error", error instanceof Error ? error.message : "Updated blog failed!"
    );
  }
  return { data, error };
};

// API get all blogs
export const getAllBlogs = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const { data, error } = await handleAsync(() =>
    apiClient.get(`/blogs?${queryString}`).then(res => res.data.data)
  );
  return { data, error };
};

// API blog detail
export const getBlogDetail = async (id: number) => {
  const { data, error } = await handleAsync(() =>
    authorizedApiClient().get(`/blogs/${id}`).then(res => res)
  );
  return { data, error };
};

// API blogs of user
export const getBlogOfUser = async (id: number, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const { data, error } = await handleAsync(() =>
    authorizedApiClient().get(`/blogs/user/${id}?${queryString}`).then(res => res)
  );
  return { data, error };
};

// API React blog
export const reactBlog = async (id: number, data: { type: string }) => {
  const { data: response, error } = await handleAsync(() =>
    authorizedApiClient().post(`/blogs/react/${id}`, data).then(res => res)
  );
  if (response) {
    showToast("success", `Add ${data.type} blog successful!`);
  } else {
    showToast(
      "error", error instanceof Error ? error.message : `Add ${data.type} blog failed!`
    );
  }
  return { response, error };
};
