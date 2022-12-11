import { error } from "@sveltejs/kit";
import Posts from "db/posts/posts";
import type { UserDetailsSchema } from "db/users/schema";
import Users from "db/users/users";
import UserDetails from "db/users/user_details";
import type { WithId } from "mongodb";
import type { PageServerLoad } from "./$types";

export const prerender = "auto";

export const load: PageServerLoad = async ({ params }) => {
  const username = params.username;
  const userID = (await Users.findOne({ username }))?._id.toString();
  if (!userID) {
    throw error(400, `/user/${username}/ `);
  }

  const details = await UserDetails.findOne({
    userID,
  }) as WithId<UserDetailsSchema>;

  const usersPosts = await Posts.find({ author_username: username }).toArray();
  let stars = 0;
  for (const posts of usersPosts) stars += posts.user_stars.length;

  const { about, account_created } = details;
  const userData = {
    username,
    stars,
    about,
    account_created,
    userID,
  };

  // Get the users most recent posts
  const recentPosts =
    (await Posts.find({ author_username: username }).toArray()).map(
      (post) => {
        const MAX_CHARS = 220;
        const { author_username, title, _id, user_stars, created, question } =
          post;
        return {
          author_username,
          title,
          partial_question: question.substring( // show only the starting characters only
            0,
            (question.length < MAX_CHARS) ? -1 : MAX_CHARS,
          ),
          user_stars: user_stars,
          id: _id.toString(),
          created: created.toDateString(),
        };
      },
    );

  return { userData, recentPosts };
};
