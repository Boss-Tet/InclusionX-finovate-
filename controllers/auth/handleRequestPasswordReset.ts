// =============================================================================
// controllers/auth/handleRequestPasswordReset.ts
// Owned by: Jabari (helping Orama)
//
// POST /api/auth/password-reset/request
// Sends a 6-digit OTP to the user's phone for password reset.
// Always returns success to prevent phone number enumeration.
// =============================================================================

import db from '@/lib/db';
import { generateOtp } from '@/services/auth/generateOtp';
import { hashOtp } from '@/services/auth/hashOtp';
import { sendPasswordResetOtp } from '@/services/auth/sendPasswordResetOtp';
import { RequestPasswordResetInput } from '@/lib/validations/auth';
import { ApiResponse } from '@/types/financial';

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes

export async function handleRequestPasswordReset(
  input: RequestPasswordResetInput,
  ipAddress?: string
): Promise<ApiResponse<{ message: string }>> {
  const { phoneNumber } = input;

  const GENERIC_OK = {
    success: true as const,
    data: { message: 'If this number is registered, a reset code has been sent.' },
  };

  const user = await db.user.findUnique({
    where: { phoneNumber },
    select: { id: true, isActive: true },
  });

  // Always return OK — prevent phone enumeration.
  if (!user || !user.isActive) return GENERIC_OK;

  const otp = generateOtp();
  const otpHash = await hashOtp(otp);

  await db.passwordResetOtp.create({
    data: {
      userId: user.id,
      otpHash,
      expiresAt: new Date(Date.now() + OTP_TTL_MS),
      ipAddress: ipAddress ?? null,
    },
  });

  await sendPasswordResetOtp(phoneNumber, otp);

  return GENERIC_OK;
}
