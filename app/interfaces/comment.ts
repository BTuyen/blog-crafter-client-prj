import { IFBlog } from "@/app/interfaces/blog";
import { IFUser } from "@/app/interfaces/user";

export interface IFComment {
  id: number;
  content: string;
  user?: IFUser;
  blog?: IFBlog;
  parent_id?: number;
  createdAt: Date;
  updatedAt: Date;
  children?: IFComment[];
}

export interface ICreateComment {
  content: string;
  blogId: number;
  parentId?: number;
}

export interface IUpdateComment {
  content: string;
}


