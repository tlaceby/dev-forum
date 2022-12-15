import Posts from "db/posts/posts";
import Users from "db/users/users";
import { ObjectId } from "mongodb";
import type { RequestHandler } from "../$types";

export const PATCH: RequestHandler = async ({ cookies, params }) => {
  const sessionID = cookies.get("session");

  if (!sessionID) {
    return new Response(
      JSON.stringify({ error: true, message: "Unauthorized" }),
      { status: 401 },
    );
  }

  const user = await Users.findOne({ sessionID: cookies.get("session") });
  if (!user) {
    return new Response(
      JSON.stringify({ error: true, message: "Unauthorized" }),
      { status: 401 },
    );
  }

  // @ts-ignore
  const postID = params?.postID as string;
  const post = await Posts.findOne({ _id: new ObjectId(postID) });

  if (!post) {
    return new Response(
      JSON.stringify({
        error: true,
        message: "Post with id of " + postID + " does not exist.",
      }),
      { status: 404 },
    );
  }

  if (post.user_stars.includes(user.username)) {
    // If user is not inside array then add them.
    post.user_stars = post.user_stars.filter((username) => {
      if (username !== user.username) {
        return username;
      }
    });
  } else {
    // If user is not inside array then add them.
    post.user_stars.push(user.username);
  }

  // Update the posts user_stars to include mutated array.
  await Posts.findOneAndUpdate({ _id: post._id }, {
    $set: { user_stars: post.user_stars },
  });

  return new Response(JSON.stringify({ success: true }));
};
