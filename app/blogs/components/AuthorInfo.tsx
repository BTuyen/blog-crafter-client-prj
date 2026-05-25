import { IFUser } from "@/app/interfaces/user";
import AvatarUser from "@/components/ui/avatar-user";

type IAuthorInfoProps = {
  author: IFUser;
  date: string | Date;
}
export default function AuthorInfo({
  author,
  date,
}: IAuthorInfoProps) {
  return (
    <div className="flex items-center space-x-4">
      <AvatarUser
        userName={author?.name}
        userAvt={author?.avatar}
        size={50}
        fontSize={"text-xs"}
      />
      <div>
        <p className="font-bold">{author?.name || "Unknown Author"}</p>
        <small className="text-gray-500">
          Posted on {new Date(date).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
}
