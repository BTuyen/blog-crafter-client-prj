import authorizedApiClient from "@/app/api/authorizedApiClient";
import { handleAsync } from "@/app/utils/handleAsyncContext";
import { ICreateComment } from "@/app/interfaces/comment";
import { showToast } from "@/lib/toast";

// API create comment
export const createComment = async (commentData: ICreateComment) => {
  const { data, error } = await handleAsync(() =>
    authorizedApiClient().post(`/comments/create`, {
      content: commentData.content,
      blogId: commentData.blogId,
      parentId: commentData.parentId,
    }).then(res => res)
  );

  if (data) {
    showToast("success", "Create comment successful!");
  } else {
    showToast(
      "error", error instanceof Error ? error.message : "Created comment failed!"
    );
  }
  return { data, error };
};

// API delete comment
export const deleteComment = async (id: number) => {
  const { data, error } = await handleAsync(() =>
    authorizedApiClient().delete(`/comments/${id}`).then(res => res)
  );

  if (data) {
    showToast("success", "Delete comment successful!");
  } else {
    showToast(
      "error", error instanceof Error ? error.message : "Delete comment failed!"
    );
  }
  return { data, error };
};
