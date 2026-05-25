import AuthorInfo from "@/app/blogs/components/AuthorInfo";
import ListTag from "@/app/blogs/components/ListTag";
import { reactionOptions } from "@/app/contants/reactions";
import { IFBlog } from "@/app/interfaces/blog";
import ReactMarkdown from "react-markdown";
import { useReactionStore } from "@/app/stores/reactionStore";
import { useEffect } from "react";

type TBlogContentProps = {
  blog: IFBlog;
  countReactions: { reactions: Record<string, number>; bookmarks: number };
};

export default function BlogContent({ blog }: TBlogContentProps) {
  const { reactions, setInitialReactions } = useReactionStore();
  const countReactions = reactions[blog.id] || {};

  useEffect(() => {
    if (blog.id && !reactions[blog.id]) {
      const reactionsObject = blog.interactions.reduce((acc, interaction) => {
        acc[interaction.id] = (acc[interaction.id] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      setInitialReactions(blog.id, reactionsObject, {});
    }
  }, [blog.id, blog.interactions, setInitialReactions, reactions]);

  return (
    <div className="flex flex-col space-y-4 m-8">
      <AuthorInfo author={blog.author} date={blog.createdAt} />
      <h1 className="text-6xl font-bold">{blog.title}</h1>
      <ListTag tags={blog.blogTags} />
      <div className="flex flex-row space-x-4">
        {Object.entries(countReactions).map(([reactionId, count]) => {
          const reaction = reactionOptions.find((r) => r.id === reactionId);
          return (
            <div
              key={reactionId}
              className="flex items-center space-x-2"
            >
              {reaction?.icon}
              <span className="ml-1 text-sm">{count || 0}</span>
            </div>
          );
        })}
      </div>
      <div className="body-blog">
        <ReactMarkdown>{blog.body}</ReactMarkdown>
      </div>
    </div>
  );
}
