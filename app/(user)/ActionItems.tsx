import { Card, CardContent } from "@/components/ui/card";
import { IFUser } from "@/app/interfaces/user";

type TActionItemsProps = {
  user: IFUser;
};

export default function ActionItems({ user }: TActionItemsProps) {
  return (
    <div className="w-full max-w-2xl mt-6 grid grid-cols-3 gap-4 text-center">
      <Card className="p-4">
        <CardContent className="text-gray-600">
          <p className="text-lg font-semibold">{user.blogCount ?? 0}</p>
          <p className="text-sm">Posts Published</p>
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardContent className="text-gray-600">
          <p className="text-lg font-semibold">{user.commentsCount ?? 0}</p>
          <p className="text-sm">Comments Written</p>
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardContent className="text-gray-600">
          <p className="text-lg font-semibold">{user.tagsCount ?? 0}</p>
          <p className="text-sm">Tags Followed</p>
        </CardContent>
      </Card>
    </div>
  );
}
