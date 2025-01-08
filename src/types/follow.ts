import { User } from "./user";
export interface Follow {
  id: number;

  follower: User;
  following: User;
}
