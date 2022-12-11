import type { ObjectId } from "mongodb";

export interface UserDetailsSchema {
  userID: string;
  about: string;
  account_created: Date;
}

export interface UserSchema {
  username: string;
  password: string;
  sessionID: string;
}

export const USERS_COLLECTION_NAME = "users";
export const USER_DETAILS_COLLECTION_NAME = "user_details";
