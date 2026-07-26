// =============================================================================
// services/auth/createSession.ts
// Owned by: Jabari (helping Orama)
//
// Creates a DB Session row and returns a signed JWT stored in an httpOnly cookie.
// Called after successful login (full session) or after 2FA verification.
// =============================================================================

import db from '@/lib/db';
import { signJwt, hashToken } from '@/lib/utils/jwt';

interface CreateSessionArgs {
  userId: string;
  platformRole: string;
  ipAddress?: string;
  userAgent?: string;
  /** Default: 'session'. Pass 'pending_2fa' for the first step of 2FA login. */
  type?: 'session' | 'pending_2fa';
}

interface CreateSessionResult {
  jwt: string;
  sessionId: string;
}

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;    // 7 days
const PENDING_TTL_MS = 5 * 60 * 1000;               // 5 minutes

export async function createSession(
  args: CreateSessionArgs
): Promise<CreateSessionResult> {
  const { userId, platformRole, ipAddress, userAgent, type = 'session' } = args;

  // Create placeholder row first to get the sessionId.
  const session = await db.session.create({
    data: {
      userId,
      tokenHash: 'pending', // replaced below once we have the JWT
      expiresAt: new Date(Date.now() + (type === 'pending_2fa' ? PENDING_TTL_MS : SESSION_TTL_MS)),
      ipAddress: ipAddress ?? null,
      userAgent: userAgent ?? null,
    },
    select: { id: true },
  });

  // Sign the JWT — includes sessionId for revocation lookup.
  const jwt = await signJwt({
    sub: userId,
    role: platformRole,
    sessionId: session.id,
    type,
  });

  // Store the SHA-256 hash of the JWT for server-side revocation.
  const tokenHash = await hashToken(jwt);
  await db.session.update({
    where: { id: session.id },
    data: { tokenHash },
  });

  return { jwt, sessionId: session.id };
}
