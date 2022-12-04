import { invalid, redirect } from "@sveltejs/kit";
import * as bcrypt from "bcrypt";
import Users from "db/users/users";
import UserDetails from "db/users/user_details";
import {
  SALT_ROUNDS,
  validateRegistrationData,
} from "utilities/authValidation";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.currentUser) {
    throw redirect(301, `/user/${locals.currentUser.username}`);
  }
};

export const actions: Actions = {
  default: async ({ request, cookies, locals }) => {
    const formData = await request.formData();
    let username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const password2 = formData.get("comfirm-password") as string;

    const validData = validateRegistrationData(
      username,
      password,
      password2,
    );

    username = username.toLowerCase();

    // TODO: Handle actual errorcodes and toast messages
    if (!validData) {
      return invalid(400, { invalidData: true });
    }

    // Check that the user does not already exists with that same username or email

    // CHECK USERNAME
    let user = await Users.findOne({ username });
    if (user) {
      return invalid(400, { alreadyTaken: true });
    }

    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
    const created_at = new Date();

    const userID = (await Users.insertOne({
      username,
      password: hashedPassword,
      sessionID: "",
    })).insertedId.toString();

    await UserDetails.insertOne({
      userID,
      account_created: created_at,
      stars: 0,
      about: "This user has not provided a about me yet.",
    });

    throw redirect(301, "/login");
  },
};
