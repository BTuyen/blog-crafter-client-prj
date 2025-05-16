"use client";

import BlogItem from "@/app/blogs/components/BlogItem";
import { IFBlog } from "@/app/interfaces/blog";
import { getBlogOfUser } from "@/app/api/blogApi";
import { useInfiniteScroll } from "@/app/hooks/useInfiniteScroll";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserStore } from "@/app/stores/useUserStore";

export default function BlogPage() {
  const user = useUserStore((state) => state.user);

  const { data: allBlogs, loading } = useInfiniteScroll<IFBlog>({
    fetchFunction: async (pageNumber) => {
      if (!user?.id) return { data: [], totalPages: 0 };
      const res = await getBlogOfUser(user.id, { page: pageNumber });
      return { data: res.data?.data?.blogs, totalPages: res.data?.data?.totalPages };
    },
  });

  return (
    <div className="mx-auto p-4">
      {!user?.id ? (
        <p className="text-center">No blogs found.</p>
      ) : allBlogs.length === 0 && !loading ? (
        <p className="text-center">No blogs found.</p>
      ) : (
        <>
          {loading && allBlogs.length === 0 ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-24 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            allBlogs.map((blog, index) => (
              <BlogItem key={`${blog.id}-${index}`} blog={blog} displayAuthor={false} />
            ))
          )}
          {loading && allBlogs.length > 0 && (
            <div className="space-y-4">
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
