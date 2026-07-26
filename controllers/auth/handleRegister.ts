// =============================================================================
// controllers/auth/handleRegister.ts
// Owned by: Jabari (helping Orama)
//
// POST /api/auth/register
// Creates a new User, then sends a 6-digit SMS OTP for phone verification.
// Does NOT log the user in — they must verify their phone first.
// =============================================================================

import db from '@/lib/db';
import { hashPassword } from '@/services/auth/hashPassword';
import { generateOtp } from '@/services/auth/generateOtp';
import { hashOtp } from '@/services/auth/hashOtp';
import { sendPhoneOtp } from '@/services/auth/sendPhoneOtp';
import { RegisterInput } from '@/lib/validations/auth';
import { ApiResponse } from '@/types/financial';

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes

export async function handleRegister(
  input: RegisterInput,
  ipAddress?: string
): Promise<ApiResponse<{ message: string }>> {
  const { phoneNumber, fullName, password, preferredLang } = input;

  // Check phone uniqueness.
  const existing = await db.user.findUnique({
    where: { phoneNumber },
    select: { id: true },
  });
  if (existing) {
    return { success: false, error: 'This phone number is already registered.', code: 'CONFLICT' };
  }

  const passwordHash = await hashPassword(password);

  // Create user — phone is NOT yet verified.
  const user = await db.user.create({
    data: {
      phoneNumber,
      fullName,
      passwordHash,
      preferredLang,
    },
    select: { id: true },
  });

  // Generate & store phone verification OTP.
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

  // Send OTP via Africa's Talking SMS (logs in dev).
  await sendPhoneOtp(phoneNumber, otp);

  return {
    success: true,
    data: {
      message: `Account created. A 6-digit verification code has been sent to ${phoneNumber}.`,
    },
  };
}
