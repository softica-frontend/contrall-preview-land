"use server";

import { cookies } from "next/headers";
import type { ApiResult } from "@/lib/api-client";
import { apiAction } from "@/lib/api-client";

export async function login(
  email: string,
  password: string,
): Promise<ApiResult<undefined>> {
  const result = await apiAction<{ accessToken: string; refreshToken: string }>(
    "POST",
    "/auth/login",
    { email, password },
  );

  if (!result.ok) return result;

  const cookieStore = await cookies();
  const secure = process.env.NODE_ENV === "production";

  cookieStore.set("access_token", result.data.accessToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  });

  cookieStore.set("refresh_token", result.data.refreshToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  cookieStore.set("auth_email", email, {
    httpOnly: false,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return { ok: true, data: undefined };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  cookieStore.delete("auth_email");
  return { ok: true as const, data: undefined };
}
