// services/auth/sendPasswordResetOtp.ts
// Reuses sendPhoneOtp with a password-reset-specific message.

import { sendPhoneOtp } from './sendPhoneOtp';

export async function sendPasswordResetOtp(
  phoneNumber: string,
  otp: string
): Promise<void> {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[DEV] Password reset OTP for ${phoneNumber}: ${otp}`);
    return;
  }
  await sendPhoneOtp(phoneNumber, otp);
}
