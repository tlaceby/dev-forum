import { type Actions, invalid, redirect } from "@sveltejs/kit";
import Posts from "db/posts/posts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request, locals }) => {
  if (locals.currentUser) {
    return locals;
  }

  throw redirect(301, "/login");
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const { userID, username } = locals.currentUser;
    const date = new Date();
    const formData = await request.formData();

    // Validate title, tags, and question body
    const title = formData.get("title") as string;
    const question = formData.get("question") as string;

    if (!title) {
      return invalid(400, {
        errorMessage: "Post is missing a valid title",
      });
    }

    if (!question) {
      return invalid(400, {
        errorMessage: "Post is missing a valid question body.",
      });
    }

    // Get all of the tags
    const tags: string[] = [];

    for (const [name, value] of formData.entries()) {
      if (name.includes("tag-")) {
        const val = value as string;
        if (val.length > 0) {
          tags.push(val.toLowerCase());
        }
      }
    }

    const { insertedId } = await Posts.insertOne({
      title,
      userID,
      question,
      tags,
      created: date,
      active: true,
      user_stars: [],
      author_username: username,
    });

    const postID = insertedId.toString();
    throw redirect(301, `/posts/${postID}/`);
  },
};
