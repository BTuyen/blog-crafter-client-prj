import { IFUser } from "@/app/interfaces/user"

export interface IFTag{
  id: number,
  name: string,
  slug?: string,
  description: string,
  blogCount?: number
  isNew?: boolean
  followers?: IFUser[]
}
