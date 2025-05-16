"use client";

import ReactionPopup from "@/app/blogs/[slug]/components/ReactionPopup";
import { BookmarkIcon, MessageCircle, HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useReactionStore } from "@/app/stores/reactionStore";
import { reactBlog } from "@/app/api/blogApi";

type TActionProps = {
  blogId: number;
  countReactions: { bookmarks: number; reactions: Record<string, number> };
  countComments: number;
};

export default function ActionBar({ blogId, countReactions, countComments }: TActionProps) {
  const [isHovered, setIsHovered] = useState(false);

  const reactionsFromStore = useReactionStore((state) => state.reactions[blogId]);
  const myReactionsFromStore = useReactionStore((state) => state.myReactions[blogId]);

  const [reactions, setReactions] = useState<Record<string, number>>({});
  const [myReactions, setMyReactions] = useState<Record<string, boolean>>({});
  const [bookmarkCount, setBookmarkCount] = useState(countReactions.bookmarks);

  useEffect(() => {
    setReactions(reactionsFromStore ?? {});
    setMyReactions(myReactionsFromStore ?? {});
  }, [blogId, reactionsFromStore, myReactionsFromStore]);

  const totalReactions = Object.values(reactions).reduce(
    (acc: number, val) => acc + (typeof val === "number" ? val : 0),
    0
  );
  const hasOtherReactions = Object.entries(myReactions).some( ([key, value]) => key !== "bookmark" && value === true );
  const hasBookmark = myReactions["bookmark"] === true;

  const handleScrollToComments = () => {
    document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBookmark = async () => {
    await reactBlog(blogId, { type: "bookmark" });

    const newMyReactions = {
      ...myReactions,
      bookmark: !hasBookmark,
    };
    setMyReactions(newMyReactions);

    const newCount = hasBookmark ? bookmarkCount - 1 : bookmarkCount + 1;
    setBookmarkCount(newCount);
  };
  return (
    <div className="fixed top-1/2 left-4 transform -translate-y-1/2 flex flex-col items-center space-y-4 text-center">
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`absolute right-0 top-0 transition-all duration-200 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
          <ReactionPopup blogId={blogId} />
        </div>

        <div
          title="Reaction"
          className={`flex flex-col items-center icon-heart leading-5 w-max h-auto bg-none cursor-pointer text-gray-600 hover:text-red-500 transition-colors duration-200 ${
            hasOtherReactions ? "text-red-500" : ""
          }`}
        >
          <HeartIcon className="w-5 h-5" />
          <span className="text-sm mt-1">
            {typeof totalReactions === "number" ? totalReactions : "No response"}
          </span>
        </div>
      </div>

      {/* Comment */}
      <div
        onClick={handleScrollToComments}
        className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-yellow-600 transition-colors duration-200"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm mt-1">{countComments}</span>
      </div>

      {/* Bookmark */}
      <div
        title="Save bookmark"
        onClick={handleBookmark}
        className={`flex flex-col items-center cursor-pointer text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
          hasBookmark ? "text-yellow-500" : ""
        }`}
      >
        <BookmarkIcon className="w-5 h-5" />
        <span className="text-sm mt-1">{bookmarkCount}</span>
      </div>
    </div>
  );
}
