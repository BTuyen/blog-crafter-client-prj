import { useReactionStore } from "@/app/stores/reactionStore";
import { reactionOptions } from "@/app/contants/reactions";

type ReactionPopupProps = {
  blogId: number;
};

export default function ReactionPopup({ blogId }: ReactionPopupProps) {
  const reactions = useReactionStore((state) => state.reactions[blogId]) || {};
  const myReactions = useReactionStore((state) => state.myReactions[blogId]) || {};
  const toggleReaction = useReactionStore((state) => state.toggleReaction);

  const handleReaction = async (reactionId: string) => {
    await toggleReaction(blogId, reactionId);
  };

  return (
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 z-50 bg-white p-2 shadow-lg rounded-md">
      {reactionOptions.map((reaction) => {
        const isActive = !!myReactions[reaction.id];
        return (
          <button
            key={reaction.id}
            onClick={() => handleReaction(reaction.id)}
            className={`flex items-center px-2 py-1 rounded-full text-sm transition duration-150 ${
              isActive
                ? "bg-gray-100 border border-gray-300"
                : "hover:bg-gray-100"
            }`}
            title={reaction.label}
          >
            <span className="text-lg">{reaction.icon}</span>
            <span className="ml-1">{reactions[reaction.id] || 0}</span>
          </button>
        );
      })}
    </div>
  );
}
