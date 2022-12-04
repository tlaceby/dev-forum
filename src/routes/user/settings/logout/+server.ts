import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ cookies }) => {
  cookies.set("session", "", { maxAge: 0, path: "/" });
  return new Response();
};
