import { IFComment } from "@/app/interfaces/comment";
import { IFInteraction } from "@/app/interfaces/interaction";
import { IFMedia } from "@/app/interfaces/media";
import { IFTag } from "@/app/interfaces/tag";
import { IFUser } from "@/app/interfaces/user";

export interface IFBlogTag {
  id: number;
  tag: IFTag;
}
export interface IFBlog {
  id: number;
  title: string;
  media: IFMedia | null;
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
