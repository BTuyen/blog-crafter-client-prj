import { useEffect, useRef } from "react";
import AuthorInfo from "@/app/blogs/components/AuthorInfo";
import ListTag from "@/app/blogs/components/ListTag";
import { IFBlog } from "@/app/interfaces/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookmarkIcon, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { withAuthAction } from "../../hoc/withAuth";
import {
  useInteractionCount,
  useUserInteractions,
} from "@/app/hooks/useUserInteractions";
import { useReactionStore } from "@/app/stores/reactionStore";
import { reactionOptions } from "@/app/contants/reactions";

type TBlogItemProps = {
  blog: IFBlog;
  displayAuthor: boolean;
};

export default function BlogItem({ blog, displayAuthor }: TBlogItemProps) {
  const router = useRouter();
  const hasInitializedReactions = useRef(false);

  const { setInitialReactions, myReactions, toggleReaction } = useReactionStore();

  const countReactions = useInteractionCount({
    interactions: blog?.interactions || {},
  });

  const initialMyReactions = useUserInteractions({
    interactions: blog?.interactions ?? [],
  });

  useEffect(() => {
    if (
      blog?.id &&
      !hasInitializedReactions.current &&
      Object.keys(initialMyReactions).length > 0
    ) {
      setInitialReactions(blog.id, countReactions.reactions, initialMyReactions);
      hasInitializedReactions.current = true;
    }
  }, [blog?.id, countReactions.reactions, initialMyReactions, setInitialReactions]);

  const handleClick = withAuthAction((action?: string) => {
    router.push(`/blogs/${blog.id}${action ? `#${action}` : ""}`);
  });

  const handleAddBookMark = withAuthAction(async (blogId: number) => {
    await toggleReaction(blogId, "bookmark");
  });

  const hasBookmark = myReactions[blog.id]?.bookmark || false;

  return (
    <Card className="w-full mb-4">
      <CardContent className="p-4">
        {displayAuthor && (
          <AuthorInfo author={blog.author} date={blog.createdAt} />
        )}
        <div className={`${displayAuthor && "pl-11"} flex flex-col space-y-4`}>
          <h2
            className="text-xl font-semibold cursor-pointer"
            onClick={() => handleClick()}
          >
            {blog.title}
          </h2>
          <ListTag tags={blog.blogTags} />
          {displayAuthor && (
            <div className="flex flex-wrap items-center gap-2 justify-between">
              <div className="flex flex-wrap gap-2">
                {countReactions.reactions &&
                  typeof countReactions.reactions === "object" &&
                  Object.entries(countReactions.reactions).map(
                    ([reactionId, count]) => {
                      const reaction = reactionOptions.find(
                        (r) => r.id === reactionId
                      );
                      return (
                        <div
                          key={reactionId}
                          className="flex items-center gap-1"
                        >
                          {reaction?.icon}
                          <span className="text-sm">{count || 0}</span>
                        </div>
                      );
                    }
                  )}
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="sm" onClick={() => handleClick("comments")}>
                  <MessageCircle className="w-4 h-4" /> <span className="text-sm">{blog.comments_count} Comments</span>
                </Button>
              </div>
              <div className="flex-1 flex items-center justify-end">
                <div
                  title="Lưu bài viết"
                  onClick={() => handleAddBookMark(blog.id)}
                  className={`flex flex-col items-center cursor-pointer text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                    hasBookmark ? "text-yellow-500" : ""
                  }`}
                >
                  <BookmarkIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
