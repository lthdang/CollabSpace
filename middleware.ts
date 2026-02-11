import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth((req: NextRequest & { auth: any }) => {
  const isAuthenticated = !!req.auth;
  const pathname = req.nextUrl.pathname;

  // Define public routes
  const publicRoutes = ["/", "/signin", "/signup"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Define protected routes
  const isProtectedRoute =
    pathname.startsWith("/meeting") || pathname.startsWith("/dashboard");

  // Redirect authenticated users away from auth pages
  if ((pathname === "/signin" || pathname === "/signup") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Protect routes - redirect to signin if not authenticated
  if (isProtectedRoute && !isAuthenticated) {
    const signInUrl = new URL("/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
