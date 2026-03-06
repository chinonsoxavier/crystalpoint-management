// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle referral redirects
  if (pathname.startsWith("/ref/")) {
    // Extract referral code from URL
    const pathSegments = pathname.split("/");
    const referralCode = pathSegments[2]; // Gets the code after /ref/

    // Validate referral code (optional but recommended)
    if (referralCode && /^[A-Z0-9]+$/i.test(referralCode)) {
      // Create new URL for sign-up with referral code as query param
      const url = new URL("/sign-up", request.url);
      url.searchParams.set("ref", referralCode);

      // Create response with redirect
      const response = NextResponse.redirect(url);

      // // Set referral code in cookie for persistence
      // response.cookies.set("referralCode", referralCode, {
      //   httpOnly: true, // Prevents client-side JavaScript access
      //   secure: process.env.NODE_ENV === "production", // HTTPS only in production
      //   sameSite: "lax", // CSRF protection
      //   maxAge: 60 * 60 * 24 * 30, // 30 days expiration
      //   path: "/", // Available site-wide
      // });

      return response;
    } else {
      // Invalid referral code - redirect to sign-up without ref
      return NextResponse.redirect(new URL("/sign-up", request.url));
    }
  }

  // Continue to the requested page if no referral handling needed
  return NextResponse.next();
}

// Configure which paths the proxy should run on
export const config = {
  matcher: [
    // Match all paths starting with /ref/
    "/ref/:path*",
    // Optional: Also match sign-up to handle cookie setting
    "/sign-up/:path*",
  ],
};
