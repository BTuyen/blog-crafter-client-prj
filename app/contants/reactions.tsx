import { DogIcon, HeartIcon } from "lucide-react";

export enum ReactionType {
  UNICORN = "unicorn",
  LIKE = "like",
}

export const reactionOptions = [
  {
    id: ReactionType.UNICORN,
    icon: <DogIcon className="w-5 h-5 text-blue-500" />,
    label: "Unicorn",
  },
  {
    id: ReactionType.LIKE,
    icon: <HeartIcon className="w-5 h-5 text-red-500" />,
    label: "Like",
  },
] as const;
