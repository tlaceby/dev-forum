import db from "db/database";
import { POSTS_COLLECTION_NAME, type PostSchema } from "./schema";

const Posts = db.collection<PostSchema>(POSTS_COLLECTION_NAME);
export default Posts;
