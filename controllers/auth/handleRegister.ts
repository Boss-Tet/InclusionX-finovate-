// =============================================================================
// controllers/auth/handleRegister.ts
//
// POST /api/auth/register
// Creates a new User, then sends a 6-digit OTP to the user's EMAIL address
// for verification. Does NOT log the user in — they must verify email first.
// Phone number is stored if provided but is NOT the OTP delivery channel.
// =============================================================================

import db from '@/lib/db';
import { hashPassword } from '@/services/auth/hashPassword';
import { generateOtp } from '@/services/auth/generateOtp';
import { hashOtp } from '@/services/auth/hashOtp';
import { sendEmailOtp } from '@/services/auth/sendEmailOtp';
import { RegisterInput } from '@/lib/validations/auth';
import { ApiResponse } from '@/types/financial';

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes

export async function handleRegister(
  input: RegisterInput,
  ipAddress?: string
): Promise<ApiResponse<{ message: string }>> {
  const { email, fullName, password, preferredLang } = input;
  // Normalise: treat empty string or undefined as null (avoids unique-index collision on "")
  const phoneNumber: string | null = input.phoneNumber && input.phoneNumber.trim() !== '' ? input.phoneNumber : null;

  // Check email uniqueness.
  const existingEmail = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (existingEmail) {
    return { success: false, error: 'This email address is already registered.', code: 'CONFLICT' };
  }

  // Check phone uniqueness if provided.
  if (phoneNumber) {
    const existingPhone = await db.user.findUnique({
      where: { phoneNumber },
      select: { id: true },
    });
    if (existingPhone) {
      return { success: false, error: 'This phone number is already registered.', code: 'CONFLICT' };
    }
  }

  const passwordHash = await hashPassword(password);

  // Create user — email is NOT yet verified.
  const user = await db.user.create({
    data: {
      email,
      phoneNumber: phoneNumber ?? null,
      fullName,
      passwordHash,
      preferredLang,
    },
    select: { id: true },
  });

  // Generate & store email verification OTP.
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

  return {
    success: true,
    data: {
      message: `Account created. A 6-digit verification code has been sent to ${email}.`,
    },
  };
}
