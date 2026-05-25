"use client";

import useSearchStore from "@/app/stores/useSearch";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const SearchSuggestions = () => {
  const { suggestions, loading } = useSearchStore();

  if (loading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
        <div className="py-2 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        </div>
      </div>
    );
  }

  if (suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
      <div className="py-2">
        {suggestions.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.id}`}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white"
          >
            {blog.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestions;
