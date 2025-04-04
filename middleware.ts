import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const isLoggedIn = !!accessToken && !!refreshToken;
  const pathName = request.nextUrl.pathname;
  const isLoginPage =
    pathName.startsWith("/login") || pathName.startsWith("/register") || pathName.startsWith("/auth");

  if (!isLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/auth/:path*"],
};
