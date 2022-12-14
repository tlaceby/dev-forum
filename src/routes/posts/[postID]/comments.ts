import { type Action, fail } from "@sveltejs/kit";
import { Comments } from "db/posts/posts";

export const handleNewComment: Action = async ({ request, params, locals }) => {
  const postID = params.postID as string;
  const formData = await request.formData();
  const body = formData.get("body") as string;

  if (!body) {
    return fail(400, { error: "Missing body" });
  }

  const comment = {
    id: crypto.randomUUID(),
    body,
    postID,
    author: locals.currentUser.username,
    created: new Date(),
    stars: 0,
  };

  const postComment = await Comments.findOneAndUpdate({ postID }, {
    $push: { comments: comment },
  });

  if (!postComment.ok) {
    return fail(500, { error: "Failed to create comment" });
  }

  return { created: comment };
};

export const handleRemoveComment: Action = async (
  { request, params, locals },
) => {
  const postID = params.postID as string;
  const formData = await request.formData();
  const id = formData.get("id") as string;

  if (!id) {
    return fail(400, { error: "Missing id" });
  }

  const postComment = await Comments.findOne({ postID });

  if (!postComment) {
    return fail(404, { error: "Post not found" });
  }

  // Remove the comment from the array and then update database
  const comments = postComment.comments.filter((comment) => comment.id !== id);

  Comments.findOneAndUpdate({ postID }, {
    $set: { comments },
  });
};
