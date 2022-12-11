import Posts from "db/posts/posts";
import type { RequestHandler } from "./$types";

// https://kit.svelte.dev/docs/routing#server
export const GET: RequestHandler = async () => {
  // Get the posts and then sort and reverse.
  const posts = JSON.stringify(
    (await Posts.find({}).limit(100).toArray()).sort((a, b) =>
      a.user_stars.length - b.user_stars.length
    ).reverse(),
  );

  // Return response as JSON
  return new Response(posts);
};
