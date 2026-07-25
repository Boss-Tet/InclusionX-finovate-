/**
 * middleware.ts — Next.js Edge Middleware
 *
 * Intercepts every request BEFORE it reaches a page or API route.
 * Responsibilities:
 *  1. Verify the session token (NextAuth / JWT)
 *  2. Redirect unauthenticated users to /login
 *  3. Guard role-sensitive routes (bank-officer, admin, etc.)
 *
 * Owned by: Orama
 * See: controllers/auth for the role-check helpers used here.
 */

export function middleware() {
  // TODO: implement session check + role-based redirect
}

export const config = {
  matcher: [
    '/(member)/:path*',
    '/(chairperson)/:path*',
    '/(treasurer)/:path*',
    '/(secretary)/:path*',
    '/(bank-officer)/:path*',
    '/(admin)/:path*',
  ],
};
