// =============================================================================
// lib/utils/jwt.ts
// Owned by: Jabari (helping Orama)
//
// Edge-compatible JWT helpers using `jose` (no Node.js crypto dependency).
// Used by: createSession.ts, verifySession.ts, middleware.ts
//
// Payload shape:
//   sub         → User.id
//   role        → User.platformRole
//   sessionId   → Session.id (for DB-level revocation)
//   type        → 'session' | 'pending_2fa'
// =============================================================================

import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

export interface AppJwtPayload extends JWTPayload {
  sub: string;            // User.id
  role: string;           // PlatformRole
  sessionId: string;      // Session.id — enables server-side revocation
  type: 'session' | 'pending_2fa';
}

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'change-me-in-production-min-32-chars!!'
);

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;   // 7 days
const PENDING_2FA_TTL_SECONDS = 60 * 5;          // 5 minutes

/**
 * Signs a JWT. For pending_2fa tokens the TTL is 5 min; for full sessions 7 days.
 */
export async function signJwt(
  payload: Omit<AppJwtPayload, 'iat' | 'exp'>
): Promise<string> {
  const ttl = payload.type === 'pending_2fa' ? PENDING_2FA_TTL_SECONDS : SESSION_TTL_SECONDS;

  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${ttl}s`)
    .sign(SECRET);
}

/**
 * Verifies a JWT and returns the typed payload.
 * Throws if the token is expired or the signature is invalid.
 */
export async function verifyJwt(token: string): Promise<AppJwtPayload> {
  const { payload } = await jwtVerify(token, SECRET, { algorithms: ['HS256'] });
  return payload as AppJwtPayload;
}

/**
 * Computes a SHA-256 hex digest of the raw JWT for DB storage.
 * Used as Session.tokenHash — allows server-side token revocation.
 * Works in both Edge Runtime and Node.js.
 */
export async function hashToken(token: string): Promise<string> {
  const data = new TextEncoder().encode(token);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
