import { IFUser } from "@/app/interfaces/user";

export interface IFInteraction {
  id: number;
  interaction_type: string;
  user: IFUser
}
