// =============================================================================
// controllers/auth/handleSetup2fa.ts
// Owned by: Jabari (helping Orama)
//
// POST /api/auth/2fa/setup
// Generates a TOTP secret + otpauth:// URL for QR rendering.
// The secret is NOT stored yet — only after handleEnable2fa confirms it.
// The caller must be authenticated (full session, not pending_2fa).
// =============================================================================

import db from '@/lib/db';
import { generateTotpSecret } from '@/services/auth/generateTotpSecret';
import { ApiResponse } from '@/types/financial';

interface Setup2faResult {
  otpauthUrl: string; // render as QR code
  secret: string;     // show as text fallback for manual entry
}

export async function handleSetup2fa(
  userId: string
): Promise<ApiResponse<Setup2faResult>> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { phoneNumber: true, email: true, twoFactorEnabled: true },
  });
  if (!user) return { success: false, error: 'User not found.', code: 'NOT_FOUND' };
  if (user.twoFactorEnabled) {
    return { success: false, error: '2FA is already enabled on this account.', code: 'INVALID_STATE' };
  }

  // Generate secret — NOT persisted until user confirms via /2fa/enable.
  // Use email as TOTP issuer label (phoneNumber is now optional).
  const totpLabel = user.phoneNumber ?? user.email ?? userId;
  const { secret, otpauthUrl } = generateTotpSecret(totpLabel);

  // Store the unconfirmed secret temporarily in the user row.
  // We use twoFactorSecret as the staging field; twoFactorEnabled stays false.
  await db.user.update({
    where: { id: userId },
    data: { twoFactorSecret: secret },
  });

  return { success: true, data: { otpauthUrl, secret } };
}
