// =============================================================================
// controllers/auth/handleEnable2fa.ts
// Owned by: Jabari (helping Orama)
//
// POST /api/auth/2fa/enable
// User confirms their authenticator app works by submitting a valid TOTP code.
// On success: twoFactorEnabled = true, backup codes generated and returned.
// =============================================================================

import db from '@/lib/db';
import { verifyTotpCode } from '@/services/auth/verifyTotpCode';
import { generateBackupCodes } from '@/services/auth/generateBackupCodes';
import { ApiResponse } from '@/types/financial';

interface Enable2faResult {
  /** Show once to the user — never retrievable again. */
  backupCodes: string[];
  message: string;
}

export async function handleEnable2fa(
  userId: string,
  code: string
): Promise<ApiResponse<Enable2faResult>> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { twoFactorSecret: true, twoFactorEnabled: true },
  });
  if (!user) return { success: false, error: 'User not found.', code: 'NOT_FOUND' };
  if (user.twoFactorEnabled) {
    return { success: false, error: '2FA is already enabled.', code: 'INVALID_STATE' };
  }
  if (!user.twoFactorSecret) {
    return { success: false, error: 'Complete 2FA setup first via /api/auth/2fa/setup.', code: 'INVALID_STATE' };
  }

  // Verify the TOTP code against the staged secret.
  const valid = verifyTotpCode(code, user.twoFactorSecret);
  if (!valid) {
    return { success: false, error: 'Invalid authenticator code. Make sure your app is synced.', code: 'INVALID_2FA_CODE' };
  }

  // Generate backup codes.
  const { rawCodes, hashedCodes } = await generateBackupCodes();

  // Persist: enable 2FA + store hashed backup codes.
  await db.user.update({
    where: { id: userId },
    data: {
      twoFactorEnabled: true,
      twoFactorBackupCodes: hashedCodes,
    },
  });

  return {
    success: true,
    data: {
      backupCodes: rawCodes, // shown ONCE — user must save these
      message: '2FA enabled. Save these backup codes — they will not be shown again.',
    },
  };
}
