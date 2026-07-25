// =============================================================================
// controllers/auth/handleResetPassword.ts
// Owned by: Jabari (helping Orama)
//
// POST /api/auth/password-reset/verify
// 1. Verifies the 6-digit OTP (3-attempt max)
// 2. Sets the new bcrypt-hashed password
// 3. Revokes ALL active sessions (forces re-login everywhere)
// =============================================================================

import db from '@/lib/db';
import { hashOtp, otpHashesMatch } from '@/services/auth/hashOtp';
import { hashPassword } from '@/services/auth/hashPassword';
import { revokeAllUserSessions } from '@/services/auth/revokeSession';
import { ResetPasswordInput } from '@/lib/validations/auth';
import { ApiResponse } from '@/types/financial';

const MAX_ATTEMPTS = 3;

export async function handleResetPassword(
  input: ResetPasswordInput
): Promise<ApiResponse<{ message: string }>> {
  const { phoneNumber, otp, newPassword } = input;

  const user = await db.user.findUnique({
    where: { phoneNumber },
    select: { id: true },
  });
  if (!user) {
    return { success: false, error: 'Invalid or expired reset code.', code: 'INVALID_OTP' };
  }

  // Find latest valid OTP record.
  const record = await db.passwordResetOtp.findFirst({
    where: {
      userId: user.id,
      consumedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!record) {
    return { success: false, error: 'Invalid or expired reset code. Request a new one.', code: 'INVALID_OTP' };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    return { success: false, error: 'Too many incorrect attempts. Request a new reset code.', code: 'TOO_MANY_ATTEMPTS' };
  }

  const incomingHash = await hashOtp(otp);
  const matches = otpHashesMatch(incomingHash, record.otpHash);

  if (!matches) {
    await db.passwordResetOtp.update({
      where: { id: record.id },
      data: { attempts: { increment: 1 } },
    });
    return { success: false, error: 'Incorrect reset code.', code: 'INVALID_OTP' };
  }

  const passwordHash = await hashPassword(newPassword);

  // Consume OTP + update password + reset lockout + revoke all sessions atomically.
  await db.$transaction([
    db.passwordResetOtp.update({
      where: { id: record.id },
      data: { consumedAt: new Date() },
    }),
    db.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    }),
  ]);

  // Revoke all active sessions (security best practice — force re-login everywhere).
  await revokeAllUserSessions(user.id);

  return { success: true, data: { message: 'Password reset successful. Please log in with your new password.' } };
}
