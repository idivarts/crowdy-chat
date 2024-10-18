import { IUser } from "@/shared-libs/firestore/crowdy-chat/models/users";

export interface User extends IUser {
  id: string;
}
