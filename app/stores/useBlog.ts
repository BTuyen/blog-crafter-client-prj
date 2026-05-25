import { create } from "zustand";
import { IFBlog } from "@/app/interfaces/blog";

type BlogStore = {
  blogs: IFBlog[];
  loading: boolean;
  setBlogs: (blogs: IFBlog[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useBlogStore = create<BlogStore>((set) => ({
  blogs: [],
  loading: true,
  setBlogs: (blogs: IFBlog[]) => set({ blogs }),
  setLoading: (loading: boolean) => set({ loading }),
}));
