import { type Action, type Actions, fail, redirect } from "@sveltejs/kit";
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

const handleUpdateContents: Action = async ({ request, params, locals }) => {
  const formData = await request.formData();
  const _id = new ObjectId(params.postID);
  const post = await Posts.findOne({ _id });

  if (!post) {
    return fail(404, { error: "Post not found" });
  }

  // validate user has ability to even update post
  if (locals?.currentUser.userID !== post.userID) {
    return fail(403, {
      error: "You do not have permission to update this post",
    });
  }

  const title = formData.get("title") as string || post.title;
  const question = formData.get("question") as string || post.question;

  if (!title || !question) {
    return fail(400, { error: "Title and contents are required" });
  }

  const updateResult = await Posts.findOneAndUpdate({ _id }, {
    $set: { title, question: question },
  });

  if (!updateResult) {
    return fail(500, { error: "Something went wrong" });
  }

  return { status: 200 };
};

export const actions: Actions = {
  comment: handleNewComment,
  deleteComment: handleRemoveComment,
  updatePost: handleUpdateContents,
  deletePost: async ({ params, locals }) => {
    const _id = new ObjectId(params.postID);

    const result = await Posts.findOneAndDelete({
      _id,
      userID: locals?.currentUser.userID,
    });

    if (!result) {
      return fail(500, { error: "Something went wrong" });
    }

    throw redirect(301, "/");
  },
};
