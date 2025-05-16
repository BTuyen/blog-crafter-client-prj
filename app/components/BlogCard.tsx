import { IFBlog } from "@/app/interfaces/blog";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

type BlogCardProps = {
  blog: IFBlog;
};

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blogs/${blog.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {blog.media?.url && (
          <div className="relative h-48">
            <Image
              src={blog.media.url}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {blog.body}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{blog.author?.name}</span>
            <span>{format(new Date(blog.createdAt), "MMM dd, yyyy")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
