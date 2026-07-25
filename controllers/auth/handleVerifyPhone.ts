// =============================================================================
// controllers/auth/handleVerifyPhone.ts
// Owned by: Jabari (helping Orama)
//
// POST /api/auth/verify-phone
// Verifies the 6-digit SMS OTP sent during registration.
// On success: marks User.isPhoneVerified = true.
// =============================================================================

import db from '@/lib/db';
import { hashOtp, otpHashesMatch } from '@/services/auth/hashOtp';
import { VerifyPhoneInput } from '@/lib/validations/auth';
import { ApiResponse } from '@/types/financial';

const MAX_ATTEMPTS = 3;

export async function handleVerifyPhone(
  input: VerifyPhoneInput
): Promise<ApiResponse<{ message: string }>> {
  const { phoneNumber, otp } = input;

  const user = await db.user.findUnique({
    where: { phoneNumber },
    select: { id: true, isPhoneVerified: true },
  });
  if (!user) {
    return { success: false, error: 'User not found.', code: 'NOT_FOUND' };
  }
  if (user.isPhoneVerified) {
    return { success: false, error: 'Phone number is already verified.', code: 'INVALID_STATE' };
  }

  // Find the latest unconsumed OTP for this user.
  const record = await db.passwordResetOtp.findFirst({
    where: {
      userId: user.id,
      consumedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!record) {
    return { success: false, error: 'No valid verification code found. Request a new one.', code: 'NOT_FOUND' };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    return { success: false, error: 'Too many incorrect attempts. Request a new code.', code: 'TOO_MANY_ATTEMPTS' };
  }

  const incomingHash = await hashOtp(otp);
  const matches = otpHashesMatch(incomingHash, record.otpHash);

  if (!matches) {
    // Increment attempt counter.
    await db.passwordResetOtp.update({
      where: { id: record.id },
      data: { attempts: { increment: 1 } },
    });
    const remaining = MAX_ATTEMPTS - record.attempts - 1;
    return {
      success: false,
      error: `Incorrect code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`,
      code: 'INVALID_OTP',
    };
  }

  // Mark OTP consumed + phone verified atomically.
  await db.$transaction([
    db.passwordResetOtp.update({
      where: { id: record.id },
      data: { consumedAt: new Date() },
    }),
    db.user.update({
      where: { id: user.id },
      data: { isPhoneVerified: true },
    }),
  ]);

  return { success: true, data: { message: 'Phone number verified. You can now log in.' } };
}
