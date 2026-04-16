import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Patterns handle both prefixed (/en/profile) and default-locale unprefixed (/profile) paths
const PROFILE_PATTERN = /(?:\/[^/]+)?\/profile/;
const AUTH_PATTERN = /(?:\/[^/]+)?\/auth/;

async function refreshAccessToken(
  _refreshToken: string,
): Promise<string | null> {
  try {
    // TODO: replace with real Java API endpoint
    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ refresh_token: refreshToken }),
    //   },
    // );
    // if (!res.ok) return null;
    // const data = await res.json();
    // return data.access_token;
    //

    return "mock-access-token-refreshed";
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (AUTH_PATTERN.test(pathname)) {
    const refreshToken = request.cookies.get("refresh_token")?.value;
    if (refreshToken) {
      const myTrackersUrl = request.nextUrl.clone();
      myTrackersUrl.pathname = pathname.replace(
        /\/auth.*/,
        "/profile/my-trackers",
      );
      return NextResponse.redirect(myTrackersUrl);
    }
  }

  if (PROFILE_PATTERN.test(pathname)) {
    const refreshToken = request.cookies.get("refresh_token")?.value;

    if (!refreshToken) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = pathname.replace(/\/profile.*/, "/auth/login");
      return NextResponse.redirect(loginUrl);
    }

    const accessToken = request.cookies.get("access_token")?.value;

    if (!accessToken) {
      const newAccessToken = await refreshAccessToken(refreshToken);

      if (!newAccessToken) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = pathname.replace(/\/profile.*/, "/auth/login");
        return NextResponse.redirect(loginUrl);
      }

      const requestHeaders = new Headers(request.headers);
      const existingCookies = request.headers.get("cookie") ?? "";
      requestHeaders.set(
        "cookie",
        existingCookies
          ? `${existingCookies}; access_token=${newAccessToken}`
          : `access_token=${newAccessToken}`,
      );
      const patchedRequest = new NextRequest(request, {
        headers: requestHeaders,
      });

      const response = intlMiddleware(patchedRequest);
      response.cookies.set("access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
      });
      return response;
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
