"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IFTag } from "@/app/interfaces/tag";
import { followTag, getTagDetail } from "@/app/api/tagApi";
import { Button } from "@/components/ui/button";
import BlogList from "@/app/blogs/components/BlogList";
import { withAuthAction } from "../../hoc/withAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { useTagStore } from "@/app/stores/useTagStore"; // Import Zustand store

export default function TagDetailPage() {
  const [tag, setTag] = useState<IFTag | null>(null);
  const [loading, setLoading] = useState(true);
  const { followedTags, toggleFollowTag } = useTagStore(); // Lấy trạng thái từ store
  const params = useParams();
  const tagId = params.slug ? Number(params.slug) : null;

  useEffect(() => {
    if (!tagId) return;

    const fetchTag = async () => {
      const { data } = await getTagDetail(tagId);
      setTag(data?.data);
      setLoading(false);
    };
    fetchTag();
  }, [tagId]);

  const handleFollowTag = withAuthAction(async (tagId: number) => {
    await followTag(tagId);
    toggleFollowTag(tagId); // Cập nhật trạng thái trong Zustand
  });

  if (loading) {
    return (
      <div className="mx-auto flex gap-12 py-8 px-16">
        <div className="flex-1 border rounded-lg p-6 shadow-lg">
          <Skeleton className="w-full h-[350px] rounded-lg" />
          <Skeleton className="h-8 w-3/4 mt-4" />
          <Skeleton className="h-6 w-1/2 mt-2" />
          <Skeleton className="h-5 w-full mt-2" />
        </div>
      </div>
    );
  }

  if (!tag) return null;

  // Kiểm tra xem tag đã được follow chưa
  const isFollowed = followedTags.includes(tag.id);

  return (
    <div className="mx-auto flex gap-12 py-6 px-16">
      <div className="w-60 p-4 space-y-4">
        <p className="text-2xl font-bold">#{tag.name}</p>
        <p>{tag.description}</p>
        <Button onClick={() => handleFollowTag(tag.id)}>
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </div>
      <BlogList tag={tag.name} />
    </div>
  );
}
