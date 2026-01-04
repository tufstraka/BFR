"use server";

import { cookies } from "next/headers";

// Session cookie name
const SESSION_COOKIE = "session";

export async function createSession(idToken: string) {
  const cookieStore = await cookies();
  
  // Set the session cookie
  cookieStore.set(SESSION_COOKIE, idToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 5, // 5 days
    path: "/",
  });

  return { success: true };
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return { success: true };
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value || null;
}