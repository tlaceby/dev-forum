export interface PostSchema {
  userID: string;
  author_username: string;
  title: string;
  question: string;
  tags: string[];
  created: Date;
  active: boolean;
  user_stars: string[]; // contains the array of user_names who starred any particular post
}

export const POSTS_COLLECTION_NAME = "posts";
