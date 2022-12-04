import type { Cookies } from "@sveltejs/kit";

const MAX_AGE_15_DAYS = 15 * 60 * 60 * 24;
const MAX_AGE_1_DAYS = 1 * 60 * 60 * 24;

export async function createSession(cookies: Cookies, stayLoggedIn = false) {
  const sessionID = crypto.randomUUID();
  const maxAge = (stayLoggedIn) ? MAX_AGE_15_DAYS : MAX_AGE_1_DAYS;

  cookies.set("session", sessionID, {
    maxAge,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    path: "/",
  });

  return sessionID;
}
