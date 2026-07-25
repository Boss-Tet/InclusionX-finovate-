// =============================================================================
// controllers/auth/handleVerify2fa.ts
// Owned by: Jabari (helping Orama)
//
// POST /api/auth/2fa/verify
// Second step of the 2FA login flow.
// Accepts either a 6-digit TOTP code OR an 8-char backup code.
// On success: revokes the pending_2fa session and issues a full session JWT.
// =============================================================================

import db from '@/lib/db';
import { verifyJwt } from '@/lib/utils/jwt';
import { verifyTotpCode } from '@/services/auth/verifyTotpCode';
import { findMatchingBackupCode } from '@/services/auth/generateBackupCodes';
import { revokeSession } from '@/services/auth/revokeSession';
import { createSession } from '@/services/auth/createSession';
import { Verify2faInput } from '@/lib/validations/auth';
import { ApiResponse } from '@/types/financial';

export async function handleVerify2fa(
  input: Verify2faInput,
  meta: { ipAddress?: string; userAgent?: string }
): Promise<ApiResponse<{ token: string }>> {
  const { pendingToken, code } = input;

  // 1. Verify the pending_2fa token.
  let payload;
  try {
    payload = await verifyJwt(pendingToken);
  } catch {
    return { success: false, error: 'Invalid or expired 2FA session. Please log in again.', code: 'INVALID_TOKEN' };
  }

  if (payload.type !== 'pending_2fa') {
    return { success: false, error: 'Invalid token type.', code: 'INVALID_TOKEN' };
  }

  // 2. Load user's 2FA secret + backup codes.
  const user = await db.user.findUnique({
    where: { id: payload.sub },
    select: {
      id: true,
      platformRole: true,
      twoFactorSecret: true,
      twoFactorBackupCodes: true,
      twoFactorEnabled: true,
    },
  });
  if (!user || !user.twoFactorEnabled || !user.twoFactorSecret) {
    return { success: false, error: '2FA is not enabled on this account.', code: 'INVALID_STATE' };
  }

  // 3a. Try TOTP (6-digit code).
  const isTotpCode = /^\d{6}$/.test(code);
  if (isTotpCode) {
    const valid = verifyTotpCode(code, user.twoFactorSecret);
    if (!valid) {
      return { success: false, error: 'Invalid authenticator code.', code: 'INVALID_2FA_CODE' };
    }
  } else {
    // 3b. Try backup code (format: "xxxx-xxxx").
    const matchIndex = await findMatchingBackupCode(code, user.twoFactorBackupCodes);
    if (matchIndex === -1) {
      return { success: false, error: 'Invalid backup code.', code: 'INVALID_2FA_CODE' };
    }
    // Consume the backup code — remove it from the array.
    const updatedCodes = user.twoFactorBackupCodes.filter((_, i) => i !== matchIndex);
    await db.user.update({
      where: { id: user.id },
      data: { twoFactorBackupCodes: updatedCodes },
    });
  }

  // 4. Revoke the pending_2fa session; issue full session.
  await revokeSession(payload.sessionId);

  const { jwt } = await createSession({
    userId: user.id,
    platformRole: user.platformRole,
    ipAddress: meta.ipAddress,
    userAgent: meta.userAgent,
    type: 'session',
  });

  return { success: true, data: { token: jwt } };
}
