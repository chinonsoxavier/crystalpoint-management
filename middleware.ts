// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  console.log("token:", token);

  // Allow static files + Next.js internal files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // 🚀 Public routes (no auth needed)
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up");

  // If logged in and trying to access login/signup → redirect to dashboard
  if (token && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  // 🚀 Protected routes (token required)
  const isProtectedRoute = pathname.startsWith("/user");

  // If trying to access protected route without token → redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/sign-in", request.url);
    // loginUrl.searchParams.set("callbackUrl", pathname);
    // return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*", // protected
    "/sign-in", // public
    "/sign-up", // public
    "/", // public
  ],
};
