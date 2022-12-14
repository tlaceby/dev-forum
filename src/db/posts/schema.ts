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

export interface Comment {
  id: string;
  author: string;
  body: string;
  created: Date;
}

export interface PostCommentsSchema {
  postID: string;
  post_author: string;
  comments: Comment[];
}

export const POSTS_COLLECTION_NAME = "posts";
export const POSTS_COMMENTS_COLLECTION_NAME = "post_comments";
