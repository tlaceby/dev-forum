import type { Handle } from "@sveltejs/kit";
import Users from "db/users/users";

export const handle: Handle = async ({ event, resolve }) => {
  const { cookies, locals } = event;
  const sessionID = cookies.get("session");

  // Validate session is attached to active user
  if (sessionID) {
    const user = await Users.findOne({ sessionID });
    if (user) {
      locals.currentUser = {
        userID: user._id.toString(),
        username: user.username,
      };
    } else {
      // @ts-ignore
      locals.currentUser = null;
    }
  }

  const response = await resolve(event);
  return response;
};
