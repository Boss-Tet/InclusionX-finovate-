// =============================================================================
// services/auth/sendEmailOtp.ts
//
// Dispatches a 6-digit OTP to a user's email address via nodemailer/SMTP.
// Replaces sendPhoneOtp for registration and password-reset flows.
// In development (non-production), logs the OTP to the console instead of
// actually sending, so no SMTP config is required locally.
// =============================================================================

import { sendEmail } from '@/providers/smtp';

/**
 * Sends a 6-digit OTP to the given email address.
 * In development, the OTP is logged to the console (no real email sent).
 */
export async function sendEmailOtp(email: string, otp: string): Promise<void> {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[DEV] Email OTP for ${email}: ${otp}`);
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body style="margin:0;padding:0;background:#f1f4f2;font-family:'Inter',-apple-system,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f4f2;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">
              <!-- Header -->
              <tr>
                <td style="background:#1E3D28;padding:28px 32px;text-align:center;">
                  <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">VSLA<span style="color:#E3B341;">.</span>Connect</span>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:36px 32px 24px;">
                  <h1 style="margin:0 0 8px;font-size:20px;font-weight:800;color:#151A17;">Verification Code</h1>
                  <p style="margin:0 0 28px;font-size:14px;color:#6B7280;line-height:1.6;">
                    Use the code below to verify your email address. It expires in <strong>10 minutes</strong>.
                  </p>
                  <!-- OTP Box -->
                  <div style="text-align:center;margin-bottom:28px;">
                    <div style="display:inline-block;background:#F0F7F3;border:2px dashed #2E7D46;border-radius:14px;padding:20px 36px;">
                      <span style="font-size:36px;font-weight:800;letter-spacing:10px;color:#1E3D28;font-family:monospace;">${otp}</span>
                    </div>
                  </div>
                  <p style="margin:0;font-size:13px;color:#9CA3AF;line-height:1.6;">
                    If you did not request this code, you can safely ignore this email.
                    Never share this code with anyone.
                  </p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="padding:16px 32px 28px;border-top:1px solid #E4E7E5;">
                  <p style="margin:0;font-size:12px;color:#9CA3AF;text-align:center;">
                    Powered by VSLA Connect · Finovate Malawi
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const result = await sendEmail({
    to: email,
    subject: `${otp} — Your VSLA Connect verification code`,
    html,
    text: `Your VSLA Connect verification code is: ${otp}\n\nIt expires in 10 minutes. Do not share it with anyone.`,
  });

  if (!result.success) {
    throw new Error('Failed to send verification email. Please try again.');
  }
}
