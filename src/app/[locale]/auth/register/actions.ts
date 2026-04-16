"use server";

import { cookies } from "next/headers";

export async function register(email: string, _password: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // TODO: replace mock with real call
  // return apiAction("POST", "/auth/register", { email, password });

  const cookieStore = await cookies();

  cookieStore.set("access_token", "mock-access-token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  });

  cookieStore.set("refresh_token", "mock-refresh-token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  cookieStore.set("auth_email", email, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return { ok: true as const, data: undefined };
}
