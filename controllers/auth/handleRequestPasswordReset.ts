// =============================================================================
// controllers/auth/handleRequestPasswordReset.ts
//
// POST /api/auth/password-reset/request
// Sends a 6-digit OTP to the user's EMAIL for password reset.
// Always returns success to prevent email enumeration.
// =============================================================================

import db from '@/lib/db';
import { generateOtp } from '@/services/auth/generateOtp';
import { hashOtp } from '@/services/auth/hashOtp';
import { sendEmailOtp } from '@/services/auth/sendEmailOtp';
import { RequestPasswordResetInput } from '@/lib/validations/auth';
import { ApiResponse } from '@/types/financial';

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes

export async function handleRequestPasswordReset(
  input: RequestPasswordResetInput,
  ipAddress?: string
): Promise<ApiResponse<{ message: string }>> {
  const { email } = input;

  const GENERIC_OK = {
    success: true as const,
    data: { message: 'If this email is registered, a reset code has been sent.' },
  };

  const user = await db.user.findUnique({
    where: { email },
    select: { id: true, isActive: true },
  });

  // Always return OK — prevent email enumeration.
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

  // Send OTP via email (logs in dev).
  await sendEmailOtp(email, otp);

  return GENERIC_OK;
}
