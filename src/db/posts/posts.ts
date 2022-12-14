import db from "db/database";
import {
  type PostCommentsSchema,
  POSTS_COLLECTION_NAME,
  POSTS_COMMENTS_COLLECTION_NAME,
  type PostSchema,
} from "./schema";

const Posts = db.collection<PostSchema>(POSTS_COLLECTION_NAME);
export const Comments = db.collection<PostCommentsSchema>(
  POSTS_COMMENTS_COLLECTION_NAME,
);

export default Posts;
