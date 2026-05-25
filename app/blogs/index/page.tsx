"use client";

import { getAllBlogs } from "@/app/api/blogApi";
import BlogItem from "@/app/blogs/components/BlogItem";
import { IFBlog } from "@/app/interfaces/blog";
import { useInfiniteScroll } from "@/app/hooks/useInfiniteScroll";
import { Skeleton } from "@/components/ui/skeleton";

type TBlogListProps = {
  tag?: string;
};

export default function BlogList({ tag }: TBlogListProps) {
  const { data: allBlogs, loading, observerRef } = useInfiniteScroll<IFBlog>({
    fetchFunction: async (page) => {
      const res = await getAllBlogs(tag ? { tag, page } : { page });
      return { data: res.data.blogs, totalPages: res.data.totalPages };
    },
  });

  return (
    <div className="container mx-auto p-4">
      {allBlogs.length === 0 && !loading ? (
        <p className="text-center">No blogs found.</p>
      ) : (
        <>
          {allBlogs.map((blog) => (
            <BlogItem key={blog.id} blog={blog} displayAuthor={true} />
          ))}

          {loading && (
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="p-4 border rounded-lg shadow">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4 mt-4" />
                  <Skeleton className="h-4 w-1/2 mt-2" />
                </div>
              ))}
            </div>
          )}

          <div ref={observerRef} className="h-10"></div>
        </>
      )}
    </div>
  );
}
