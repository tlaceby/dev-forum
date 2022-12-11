import { error, redirect } from "@sveltejs/kit";
import Posts from "db/posts/posts";
import { ObjectId } from "mongodb";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const _id = new ObjectId(params.postID);
  const post = await Posts.findOne({ _id });

  if (!post) {
    throw redirect(301, "/posts/");
  }

  const postID = post._id.toString();
  // @ts-ignore
  post._id = postID;
  return { post };
};
