// =============================================================================
// services/auth/verifySession.ts
// Owned by: Jabari (helping Orama)
//
// Validates a JWT and confirms the session is live in the DB.
// Used by: middleware.ts (on every protected request).
// =============================================================================

import db from '@/lib/db';
import { verifyJwt, hashToken, type AppJwtPayload } from '@/lib/utils/jwt';

interface VerifySessionResult {
  valid: true;
  payload: AppJwtPayload;
}

interface VerifySessionFailure {
  valid: false;
  reason: string;
}

export async function verifySession(
  token: string
): Promise<VerifySessionResult | VerifySessionFailure> {
  // 1. Verify JWT signature + expiry.
  let payload: AppJwtPayload;
  try {
    payload = await verifyJwt(token);
  } catch {
    return { valid: false, reason: 'Invalid or expired token.' };
  }

  // 2. Check the session still exists in DB and hasn't been revoked.
  const tokenHash = await hashToken(token);
  const session = await db.session.findUnique({
    where: { tokenHash },
    select: { revokedAt: true, expiresAt: true },
  });

  if (!session) return { valid: false, reason: 'Session not found.' };
  if (session.revokedAt) return { valid: false, reason: 'Session has been revoked.' };
  if (session.expiresAt < new Date()) return { valid: false, reason: 'Session expired.' };

  return { valid: true, payload };
}
