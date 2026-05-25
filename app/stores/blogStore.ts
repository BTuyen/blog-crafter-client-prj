import { create } from "zustand";

interface BlogStore {
  selectedBlogId: string | null;
  setSelectedBlogId: (id: string) => void;
}

export const useBlogStore = create<BlogStore>((set) => ({
  selectedBlogId: null,
  setSelectedBlogId: (id) => set({ selectedBlogId: id }),
}));
