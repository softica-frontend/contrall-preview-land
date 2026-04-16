"use server";

import { cookies } from "next/headers";

export async function login(email: string, _password: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // TODO: replace mock with real call
  // return apiAction("POST", "/auth/login", { email, password });

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

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  cookieStore.delete("auth_email");
  return { ok: true as const, data: undefined };
}
