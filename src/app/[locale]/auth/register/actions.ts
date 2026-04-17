"use server";

import { cookies } from "next/headers";
import type { ApiResult } from "@/lib/api-client";
import { apiAction } from "@/lib/api-client";

export async function register(
  email: string,
  password: string,
): Promise<ApiResult<undefined>> {
  const result = await apiAction<{
    access_token: string;
    refresh_token: string;
  }>("POST", "/auth/register", { email, password });

  if (!result.ok) return result;

  const cookieStore = await cookies();
  const secure = process.env.NODE_ENV === "production";

  cookieStore.set("access_token", result.data.access_token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  });

  cookieStore.set("refresh_token", result.data.refresh_token, {
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
