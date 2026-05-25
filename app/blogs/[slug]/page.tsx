"use client";

import { getBlogDetail } from "@/app/api/blogApi";
import BlogContent from "@/app/blogs/[slug]/components/BlogContent";
import ActionBar from "@/app/blogs/[slug]/components/ActionBar";
import Sidebar from "@/app/blogs/SideBar";
import { IFBlog } from "@/app/interfaces/blog";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { IFMedia } from "@/app/interfaces/media";
import { showToast } from "@/lib/toast";
import CommentForm from "@/app/blogs/[slug]/components/CommentForm";
import CommentItem from "@/app/blogs/[slug]/components/CommentItem";
import {
  useInteractionCount,
  useUserInteractions,
} from "@/app/hooks/useUserInteractions";
import { Skeleton } from "@/components/ui/skeleton";
import { useReactionStore } from "@/app/stores/reactionStore";
import { createComment } from "@/app/api/commentApi";
import { useCommentStore } from "@/app/stores/useComment";
import { IFComment } from "@/app/interfaces/comment";

export default function BlogDetailPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.slug ? Number(params.slug) : null;

  const { setInitialReactions } = useReactionStore();
  const { setInitialComments, addComment, comments } = useCommentStore();
  const hasInitializedReactions = useRef(false);
  const hasInitializedComments = useRef(false);

  const [blog, setBlog] = useState<IFBlog | null>(null);
  const [media, setMedia] = useState<IFMedia | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!blogId) return;

    const fetchBlog = async () => {
      setLoading(true);
      const { data } = await getBlogDetail(blogId);
      if (data) {
        setBlog(data.data.blog);
        setMedia(data.data.media);
      } else {
        showToast("error", "Failed to fetch blog detail");
        router.push("/");
      }
      setLoading(false);
    };

    fetchBlog();
  }, [blogId, router]);

  const countReactions = useInteractionCount({
    interactions: blog?.interactions ?? [],
  });

  const myReactions = useUserInteractions({
    interactions: blog?.interactions ?? [],
  });

  useEffect(() => {
    if (blog?.id && !hasInitializedReactions.current) {
      setInitialReactions(blog.id, countReactions.reactions, myReactions);
      hasInitializedReactions.current = true;
    }
  }, [blog?.id, countReactions.reactions, myReactions, setInitialReactions]);

  useEffect(() => {
    if (blog?.id && !hasInitializedComments.current && blog.comments) {
      setInitialComments(blog.id, blog.comments);
      hasInitializedComments.current = true;
    }
  }, [blog?.id, blog?.comments, setInitialComments]);

  const handleSubmitComment = async (commentText: string, parentId?: number) => {
    if (!commentText.trim() || !blog?.id) return;
    const { data, error } = await createComment({
      content: commentText,
      blogId: blog.id,
      parentId: parentId,
    });

    if (error) {
      showToast("error", "Failed to add comment");
      return;
    }

    if (data?.data) {
      addComment(blog.id, data.data);
      showToast("success", "Comment added successfully!");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto flex gap-12 py-8 px-16">
        <div className="flex-1 border rounded-lg p-6 shadow-lg">
          <Skeleton className="w-full h-[350px] rounded-lg" />
          <Skeleton className="h-8 w-3/4 mt-4" />
          <Skeleton className="h-6 w-1/2 mt-2" />
          <Skeleton className="h-5 w-full mt-2" />
        </div>
        <Sidebar />
      </div>
    );
  }

  if (!blog) return null;

  const currentComments = comments[blog.id] || [];

  return (
    <div className="mx-auto flex gap-12 py-8 px-16">
      <ActionBar
        blogId={blog.id}
        countReactions={countReactions}
        countComments={currentComments.length}
      />
      <div className="border h-fit rounded flex-1 shadow-lg">
        {media?.url && (
          <div className="relative w-full h-[350px]">
            <Image
              src={media.url}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <BlogContent
          blog={blog}
          countReactions={countReactions}
        />
        <section id="comments" className="m-8 space-x-4 border-t-2 py-4">
          <CommentForm onSubmit={handleSubmitComment} />
          <div className="comments mt-2 !ml-0">
            {currentComments.map((comment: IFComment) => (
              <CommentItem
                key={comment.id}
                blogId={blog.id}
                comment={comment}
                onReply={handleSubmitComment}
              />
            ))}
          </div>
        </section>
      </div>
      <Sidebar />
    </div>
  );
}
