// =============================================================================
// services/auth/sendPhoneOtp.ts
// Owned by: Jabari (helping Orama)
//
// Dispatches a 6-digit OTP via Africa's Talking SMS.
// Used for phone verification on registration.
// =============================================================================

import AfricasTalking from 'africastalking';

// Lazy singleton — only init once.
let smsClient: ReturnType<typeof AfricasTalking>['SMS'] | null = null;

function getSms() {
  if (!smsClient) {
    const at = AfricasTalking({
      apiKey: process.env.AT_API_KEY ?? '',
      username: process.env.AT_USERNAME ?? 'sandbox',
    });
    smsClient = at.SMS;
  }
  return smsClient;
}

/**
 * Sends a 6-digit OTP to the given E.164 phone number via Africa's Talking SMS.
 * In development (NODE_ENV !== 'production'), the OTP is logged instead of sent.
 */
export async function sendPhoneOtp(
  phoneNumber: string,
  otp: string
): Promise<void> {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[DEV] Phone OTP for ${phoneNumber}: ${otp}`);
    return;
  }

  await getSms().send({
    to: [phoneNumber],
    message: `Your VSLA Connect verification code is: ${otp}. It expires in 10 minutes. Do not share it.`,
    from: process.env.AT_SENDER_ID,
  });
}
