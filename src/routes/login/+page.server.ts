import { type Actions, invalid, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import * as bcrypt from "bcrypt";
import Users from "db/users/users";
import { createSession } from "utilities/sessions";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.currentUser) {
    throw redirect(301, `/user/${locals.currentUser.username}`);
  }
};

export const actions: Actions = {
  default: async ({ cookies, request, locals }) => {
    const form = await request.formData();
    let username = form.get("username") as string;
    const password = form.get("password") as string;
    const rememberMe = (form.get("remember-me")) ? true : false;

    // validate username and password
    if (
      typeof password !== "string" || typeof username !== "string"
    ) {
      return invalid(400, { invalidRequestData: true });
    }

    username = username.toLowerCase();
    const user = await Users.findOne({ username });
    // Check that matching user exist
    if (!user) {
      return invalid(400, { usernameDoesNotExist: true });
    }

    // compare hashes
    const passwordsMatch = bcrypt.compareSync(password, user.password);
    if (!passwordsMatch) {
      return invalid(400, { invalidPassword: true });
    }

    const userID = user._id.toString();
    const sessionID = await createSession(cookies, rememberMe);
    // Update database for user and add sessionID
    await Users.updateOne({ username }, { $set: { sessionID } });

    locals.currentUser = { username, userID };
    throw redirect(301, `/user/${username}/`);
  },
};
