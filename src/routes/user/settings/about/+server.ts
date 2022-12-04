import { redirect } from "@sveltejs/kit";
import Users from "db/users/users";
import UserDetails from "db/users/user_details";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, cookies }) => {
  const sessionID = cookies.get("session") as string;
  if (!sessionID) {
    throw redirect(301, "/login");
  }

  const userID = (await Users.findOne({ sessionID }))?._id.toString();

  if (!userID) {
    throw redirect(301, "/login");
  }

  const formData = await request.formData();
  const about = formData.get("about-me") as string;

  if (!about || typeof about !== "string") {
    return new Response(
      JSON.stringify({ error: "Invalid field: about", success: false }),
      { status: 400 },
    );
  }

  await UserDetails.updateOne({ userID }, { $set: { about } });
  return new Response(JSON.stringify({ success: true }));
};
