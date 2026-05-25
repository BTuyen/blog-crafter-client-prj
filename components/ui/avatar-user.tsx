import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AvatarUserProps = {
  userName: string;
  userAvt?: string;
  size: number;
  fontSize: string;
};

export default function AvatarUser({
  userName,
  userAvt,
  size,
  fontSize,
}: AvatarUserProps) {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <Avatar
        className="border-2 border-black dark:border-white shadow-lg rounded-full"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <AvatarImage src={userAvt} alt={userName} />
        <AvatarFallback
          className={`${fontSize} bg-purple-600 text-white flex items-center justify-center`}
        >
          {userName ? userName.charAt(0).toUpperCase() : "?"}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
