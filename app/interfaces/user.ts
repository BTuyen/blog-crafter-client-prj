export interface IFUser {
  id: number;
  name: string;
  email: string;
  bio?: string;
  createdAt: string;
  avatar?: string;
  blogCount?: number;
  commentsCount?: number;
  tagsCount?: number;
}

export interface IUpdateUser {
  name?: string;
  bio?: string;
  avatar?: string;
}
