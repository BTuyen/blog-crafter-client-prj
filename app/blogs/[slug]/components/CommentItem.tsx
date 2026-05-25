import { Reply } from "lucide-react";
import { IFComment } from "@/app/interfaces/comment";
import { useState } from "react";
import CommentForm from "./CommentForm";
import AvatarUser from "@/components/ui/avatar-user";
import { useCommentStore } from "@/app/stores/useComment";

type CommentItemProps = {
  blogId: number;
  comment: IFComment;
  onReply: (content: string, parentId?: number) => void;
};

export default function CommentItem({ blogId, comment, onReply }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { getChildComments } = useCommentStore();

  const handleReply = (content: string) => {
    onReply(content, comment.id);
    setShowReplyForm(false);
  };

  const replies = getChildComments(blogId, comment.id);

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex items-start gap-4">
        <div className="flex-none">
          <AvatarUser
            userName={comment.user?.name ?? "Anonymous User"}
            userAvt={comment.user?.avatar ?? ""}
            size={30}
            fontSize={"text-xs"}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="font-semibold">{comment.user?.name ?? "Anonymous User"}</div>
              {!comment.parent_id && (
                <button
                  className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                  onClick={() => setShowReplyForm(!showReplyForm)}
                >
                  <Reply />
                </button>
              )}
            </div>
          </div>
          <p className="text-gray-700 mt-1">{comment.content}</p>
          {showReplyForm && (
            <div className="mt-2">
              <CommentForm onSubmit={handleReply} placeholder="Write a reply..." />
            </div>
          )}
        </div>
      </div>
      {replies.length > 0 && (
        <div className="ml-8 mt-2">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              blogId={blogId}
              comment={reply}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

