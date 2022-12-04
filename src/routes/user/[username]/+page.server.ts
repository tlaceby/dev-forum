import { error } from "@sveltejs/kit";
import type { UserDetailsSchema } from "db/users/schema";
import Users from "db/users/users";
import UserDetails from "db/users/user_details";
import type { WithId } from "mongodb";
import type { PageServerLoad } from "./$types";

export const prerender = "auto";

export const load: PageServerLoad = async ({ params }) => {
  const username = params.username;
  console.log("user route hit %s", username);
  const userID = (await Users.findOne({ username }))?._id.toString();
  if (!userID) {
    throw error(400, `/user/${username}/ `);
  }

  const details = await UserDetails.findOne({
    userID,
  }) as WithId<UserDetailsSchema>;

  const { stars, about, account_created } = details;
  const userData = {
    username,
    stars,
    about,
    account_created,
    userID,
  };
  return { userData };
};
