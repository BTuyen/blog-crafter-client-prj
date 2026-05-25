import { IFComment } from "@/app/interfaces/comment";
import { IFInteraction } from "@/app/interfaces/interaction";
import { IFTag } from "@/app/interfaces/tag";
import { IFUser } from "@/app/interfaces/user";

export interface IFBlogTag {
  id: number;
  tag: IFTag;
}
export interface IFBlog {
  id: number;
  title: string;
  image: Record<string, unknown>;
  body: string;
  blogTags: IFBlogTag[];
  status: string;
  author: IFUser;
  createdAt: Date;
  slug: string;
  interactions: IFInteraction[];
  comments: IFComment[];
  comments_count: number;
}
