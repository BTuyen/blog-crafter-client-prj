import { create } from "zustand";
import { IFComment } from "@/app/interfaces/comment";

type CommentStore = {
  comments: Record<number, IFComment[]>;
  setInitialComments: (blogId: number, comments: IFComment[]) => void;
  addComment: (blogId: number, comment: IFComment) => void;
  updateComment: (blogId: number, commentId: number, updatedComment: IFComment) => void;
  deleteComment: (blogId: number, commentId: number) => void;
  getCommentCount: (blogId: number) => number;
  getRootComments: (blogId: number) => IFComment[];
  getChildComments: (blogId: number, parentId: number) => IFComment[];
};

export const useCommentStore = create<CommentStore>((set, get) => ({
  comments: {},

  setInitialComments: (blogId: number, comments: IFComment[]) =>
    set((state) => {
      // Flatten the nested comments structure
      const flattenComments = (comments: IFComment[]): IFComment[] => {
        return comments.reduce((acc: IFComment[], comment: IFComment) => {
          acc.push(comment);
          if (comment.children && comment.children.length > 0) {
            acc.push(...flattenComments(comment.children));
          }
          return acc;
        }, []);
      };

      const flattenedComments = flattenComments(comments);

      return {
        comments: {
          ...state.comments,
          [blogId]: flattenedComments,
        },
      };
    }),

  addComment: (blogId: number, comment: IFComment) =>
    set((state) => {
      const currentComments = state.comments[blogId] || [];
      return {
        comments: {
          ...state.comments,
          [blogId]: [...currentComments, comment],
        },
      };
    }),

  updateComment: (blogId: number, commentId: number, updatedComment: IFComment) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [blogId]: state.comments[blogId]?.map((comment) =>
          comment.id === commentId ? updatedComment : comment
        ) || [],
      },
    })),

  deleteComment: (blogId: number, commentId: number) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [blogId]: state.comments[blogId]?.filter(
          (comment) => comment.id !== commentId
        ) || [],
      },
    })),

  getCommentCount: (blogId: number) => {
    const state = get();
    return state.comments[blogId]?.length || 0;
  },

  getRootComments: (blogId: number) => {
    const state = get();
    const blogComments = state.comments[blogId] || [];
    return blogComments.filter(comment => !comment.parent_id);
  },

  getChildComments: (blogId: number, parentId: number) => {
    const state = get();
    const blogComments = state.comments[blogId] || [];
    return blogComments.filter(comment => comment.parent_id === parentId);
  },
}));
