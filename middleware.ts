import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIVATE_PATHS = new Set(["/profile", "/blogs/new", "/blogs/edit"]);
const AUTH_PATH = "/auth";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (PRIVATE_PATHS.has(pathname) && !accessToken) {
    return NextResponse.redirect(new URL(`${AUTH_PATH}?mode=login`, request.url));
  }

  const isAuthPage = pathname.startsWith(AUTH_PATH);
  const isLoginOrRegister = ["login", "register"].includes(searchParams.get("mode") || "");

  if (isAuthPage && accessToken && isLoginOrRegister) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("x-auth-page", String(isAuthPage));

  return response;
}

export const config = {
  matcher: ["/profile", "/blogs/new", "/blogs/edit", "/auth"],
};
