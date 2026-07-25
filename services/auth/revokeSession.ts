// services/auth/revokeSession.ts
// Sets Session.revokedAt — invalidates the token server-side immediately.
// Used by: handleLogout, handleResetPassword (revoke all user sessions).

import db from '@/lib/db';

/** Revoke a single session by its DB id. */
export async function revokeSession(sessionId: string): Promise<void> {
  await db.session.update({
    where: { id: sessionId },
    data: { revokedAt: new Date() },
  });
}

/** Revoke ALL active sessions for a user (e.g. after password reset). */
export async function revokeAllUserSessions(userId: string): Promise<void> {
  await db.session.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}
