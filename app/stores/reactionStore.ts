import { create } from "zustand";
import { reactBlog } from "@/app/api/blogApi";

type ReactionStore = {
  reactions: Record<number, Record<string, number>>;
  myReactions: Record<number, Record<string, boolean>>;
  setInitialReactions: (
    blogId: number,
    initialReactions: Record<string, number>,
    initialMyReactions: Record<string, boolean>
  ) => void;
  toggleReaction: (blogId: number, reactionId: string) => Promise<void>;
};

export const useReactionStore = create<ReactionStore>((set) => ({
  reactions: {},
  myReactions: {},

  setInitialReactions: (
    blogId: number,
    initialReactions: Record<string, number>,
    initialMyReactions: Record<string, boolean>
  ) =>
    set((state) => ({
      reactions: {
        ...state.reactions,
        [blogId]: initialReactions,
      },
      myReactions: {
        ...state.myReactions,
        [blogId]: initialMyReactions,
      },
    })),

  toggleReaction: async (blogId, reactionId) => {
    try {
      await reactBlog(blogId, { type: reactionId });

      set((state) => {
        const currentReactions = state.reactions[blogId] || {};
        const currentMyReactions = state.myReactions[blogId] || {};
        const isReacted = !!currentMyReactions[reactionId];

        const updatedReactions = {
          ...currentReactions,
          [reactionId]: (currentReactions[reactionId] || 0) + (isReacted ? -1 : 1),
        };

        const updatedMyReactions = {
          ...currentMyReactions,
          [reactionId]: !isReacted,
        };

        return {
          reactions: { ...state.reactions, [blogId]: updatedReactions },
          myReactions: { ...state.myReactions, [blogId]: updatedMyReactions },
        };
      });
    } catch (error) {
      console.error("Failed to react to blog:", error);
    }
  },
}));
