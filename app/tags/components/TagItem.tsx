import { followTag, unFollowTag } from "@/app/api/tagApi";
import { IFTag } from "@/app/interfaces/tag";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { withAuthAction } from "../../hoc/withAuth";
import { useUserStore } from "@/app/stores/useUserStore";
import { useState } from "react";

type TTagItemProps = {
  tag: IFTag;
};

export default function TagItem({ tag }: TTagItemProps) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  // ✅ Kiểm tra user.id có trong danh sách follower không
  const isFollowedByUser = tag.followers?.some(
    (follower) => follower.id === user?.id
  ) || false;

  const [isFollowed, setIsFollowed] = useState(isFollowedByUser);

  const handleClick = () => {
    router.push(`/tags/${tag.slug ?? tag.id}`);
  };

  const handleFollowTag = withAuthAction(async (tagId: number) => {
    try {
      if (isFollowed) {
        await unFollowTag(tagId);
      } else {
        await followTag(tagId);
      }
      setIsFollowed((prev) => !prev);
    } catch (error) {
      console.error("Follow/unfollow error:", error);
    }
  });

  return (
    <Card className="rounded-sm p-2">
      <CardHeader className="flex flex-row">
        <Badge
          key={tag.id}
          variant="outline"
          className="cursor-pointer"
          onClick={handleClick}
        >
          #{tag.name}
        </Badge>
        <small className="w-full text-end text-gray-400">
          {tag.blogCount} blogs
        </small>
      </CardHeader>
      <CardContent>
        <p>{tag.description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => handleFollowTag(tag.id)}>
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardFooter>
    </Card>
  );
}
