import { type Actions, redirect } from "@sveltejs/kit";
import Posts, { Comments } from "db/posts/posts";
import type { PostCommentsSchema } from "db/posts/schema";
import { ObjectId, type WithoutId } from "mongodb";
import type { PageServerLoad } from "./$types";
import { handleNewComment, handleRemoveComment } from "./comments";

export const load: PageServerLoad = async ({ params }) => {
  const _id = new ObjectId(params.postID);
  const post = await Posts.findOne({ _id });
  const postComment = await Comments.findOne({
    postID: params.postID,
  }, { projection: { _id: 0 } }) as WithoutId<PostCommentsSchema>;
  // { projection: { _id: 0 } } is used to exclude the _id field from the result
  // FIXME: Remember to add this everywhere that we need to serialze the data

  if (!post || !postComment) {
    throw redirect(301, "/posts/");
  }

  const postID = post._id.toString();
  // @ts-ignore
  post._id = postID;
  return { post, postComment };
};

export const actions: Actions = {
  comment: handleNewComment,
  deleteComment: handleRemoveComment,
};
