// =============================================================================
// middleware.ts — Next.js Edge Middleware
// Owned by: Orama (implemented by Jabari)
//
// Runs on the Edge Runtime (no Node.js APIs — uses Web Crypto via jose).
// Responsibilities:
//   1. Extract JWT from httpOnly cookie
//   2. Verify signature + check DB revocation via verifySession
//   3. Inject identity headers for API routes and server components
//   4. Redirect unauthenticated requests to /login
//   5. Enforce PlatformRole-based route access (bank-officer, admin paths)
//   6. For group-scoped routes, look up GroupMember and inject group headers
//
// Header contract injected downstream:
//   x-caller-user-id        → User.id
//   x-caller-platform-role  → User.platformRole
//   x-caller-session-id     → Session.id (used by logout route)
//   x-caller-group-role     → GroupMember.roleInGroup (if x-active-group-id present)
//   x-caller-member-id      → GroupMember.id         (if x-active-group-id present)
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt, hashToken } from '@/lib/utils/jwt';

// NOTE: verifySession (which hits the DB) cannot run in Edge Middleware
// because Prisma requires Node.js runtime.
// Strategy: verify JWT signature in Edge middleware (cryptographic check),
// then let API route handlers call verifySession for DB revocation check
// on sensitive operations. This is the standard Next.js pattern.

const COOKIE_NAME = 'vsla_token';

// Routes requiring PlatformRole.BANK_OFFICER or ADMIN.
const BANK_OFFICER_PATHS = ['/bank-officer', '/admin'];

// Routes that are public — skip auth check entirely.
const PUBLIC_PATHS = [
  '/api/auth/register',
  '/api/auth/verify-phone',
  '/api/auth/login',
  '/api/auth/2fa/verify',
  '/api/auth/password-reset/request',
  '/api/auth/password-reset/verify',
  '/login',
  '/register',
  '/_next',
  '/favicon.ico',
];

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Pass public routes through immediately.
  if (isPublic(pathname)) return NextResponse.next();

  // 2. Extract JWT from httpOnly cookie.
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return redirectToLogin(req);
  }

  // 3. Verify JWT signature + expiry (Edge-safe — no DB call).
  let payload;
  try {
    payload = await verifyJwt(token);
  } catch {
    return redirectToLogin(req);
  }

  // 4. Reject pending_2fa tokens on all routes except the 2FA verify endpoint.
  if (payload.type === 'pending_2fa' && pathname !== '/api/auth/2fa/verify') {
    return redirectToLogin(req);
  }

  // 5. PlatformRole guard for bank-officer / admin paths.
  const isBankPath = BANK_OFFICER_PATHS.some((p) => pathname.startsWith(p));
  if (isBankPath && !['BANK_OFFICER', 'ADMIN'].includes(payload.role)) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // 6. Inject identity headers for API routes + server components.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-caller-user-id', payload.sub);
  requestHeaders.set('x-caller-platform-role', payload.role);
  requestHeaders.set('x-caller-session-id', payload.sessionId);

  // 7. Group-role injection.
  // If the frontend sends x-active-group-id, we look up the GroupMember row.
  // NOTE: Prisma cannot run in Edge Runtime — this lookup is deferred to the
  // API route handler. The middleware sets x-active-group-id in headers so
  // each route can call resolveGroupMember() from its Node.js handler.
  const activeGroupId = req.headers.get('x-active-group-id');
  if (activeGroupId) {
    requestHeaders.set('x-active-group-id', activeGroupId);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

function redirectToLogin(req: NextRequest): NextResponse {
  const loginUrl = new URL('/login', req.url);
  loginUrl.searchParams.set('redirect', req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     * - _next/static  (static files)
     * - _next/image   (image optimisation)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
