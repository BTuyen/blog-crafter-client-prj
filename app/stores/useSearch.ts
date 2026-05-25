import { create } from "zustand";
import { debounce } from "lodash";
import { getAllBlogs } from "@/app/api/blogApi";
import { IFBlog } from "@/app/interfaces/blog";

interface SearchState {
  searchQuery: string;
  suggestions: IFBlog[];
  loading: boolean;
  setSearchQuery: (query: string) => void;
  setSuggestions: (suggestions: IFBlog[]) => void;
  setLoading: (loading: boolean) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  searchQuery: "",
  suggestions: [],
  loading: false,
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    debouncedSearch(query);
  },
  setSuggestions: (suggestions: IFBlog[]) => set({ suggestions }),
  setLoading: (loading: boolean) => set({ loading }),
}));

const debouncedSearch = debounce(async (query: string) => {
  if (query.trim() === "") {
    useSearchStore.getState().setSuggestions([]);
    return;
  }

  useSearchStore.getState().setLoading(true);
  const { data, error } = await getAllBlogs({ search: query });
  if (error) {
    throw error;
  }
  useSearchStore.getState().setSuggestions(data?.blogs?.slice(0, 5) || []);
  useSearchStore.getState().setLoading(false);
}, 500);

export default useSearchStore;
