import { IFBlogTag } from "@/app/interfaces/blog";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

type IListTagProps = { tags: IFBlogTag[] }

export default function ListTag({ tags }: IListTagProps) {
  const router = useRouter();
  const handleClick = (tagId: number) => {
    router.push(`/tags/${tagId}`);
  };
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tagObj, index) => (
        <Badge key={index} variant="outline" className="cursor-pointer"
        onClick={() => handleClick(tagObj.tag?.id)}>#{tagObj.tag?.name}</Badge>
      ))}
    </div>
  );
}
