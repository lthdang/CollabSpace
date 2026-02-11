import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default auth((req: NextRequest & { auth: any }) => {
    const isAuthenticated = !!req.auth;
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
    const isMeetingPage = req.nextUrl.pathname.startsWith('/meeting');

    // Redirect authenticated users away from auth pages
    if (isAuthPage && isAuthenticated) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Protect meeting routes - redirect to signin if not authenticated
    if (isMeetingPage && !isAuthenticated) {
        const signInUrl = new URL('/auth/signin', req.url);
        signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
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
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
