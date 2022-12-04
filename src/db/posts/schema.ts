export interface PostSchema {
  userID: string;
  author_username: string;
  title: string;
  question: string;
  tags: string[];
  created: Date;
  stars: number;
  active: boolean;
}

export const POSTS_COLLECTION_NAME = "posts";
