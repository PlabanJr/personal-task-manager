import { UserInfo } from "firebase/auth";

export type UserData = Pick<UserInfo, 'email' | 'uid'>