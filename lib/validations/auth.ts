// =============================================================================
// lib/validations/auth.ts
// Owned by: Jabari (helping Orama)
//
// Zod schemas for all auth endpoints.
// One schema per route, co-located in this file for easy cross-reference.
// =============================================================================

import { z } from 'zod';

const phone = z
  .string()
  .regex(/^\+\d{7,15}$/, 'Phone must be in E.164 format, e.g. +265991234567')
  .optional();

const email = z
  .string()
  .email('Enter a valid email address')
  .max(255);

const password = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(72, 'Password must be at most 72 characters'); // bcrypt limit

// ── Registration ──────────────────────────────────────────────────────────────
export const RegisterSchema = z.object({
  email,                                          // required — OTP is sent here
  phoneNumber: phone,                             // optional — for SMS notifications
  fullName: z.string().min(2).max(255),
  password,
  preferredLang: z.enum(['en', 'ny']).default('en'),
});
export type RegisterInput = z.infer<typeof RegisterSchema>;

// ── Email OTP verification (registration) ─────────────────────────────────────
export const VerifyEmailSchema = z.object({
  email,
  otp: z.string().length(6).regex(/^\d{6}$/, 'OTP must be 6 digits'),
});
export type VerifyEmailInput = z.infer<typeof VerifyEmailSchema>;

// ── (Legacy alias — kept so any existing imports don't break) ─────────────────
export const VerifyPhoneSchema = VerifyEmailSchema;
export type VerifyPhoneInput = VerifyEmailInput;

// ── Login ─────────────────────────────────────────────────────────────────────
export const LoginSchema = z.object({
  email,     // login identifier — same address used for OTP
  password,
});
export type LoginInput = z.infer<typeof LoginSchema>;

// ── 2FA verify (second step of login) ────────────────────────────────────────
export const Verify2faSchema = z.object({
  /** The short-lived pending_2fa JWT returned from /login */
  pendingToken: z.string().min(10),
  /** 6-digit TOTP code from authenticator app, OR an 8-char backup code */
  code: z.string().min(6).max(8),
});
export type Verify2faInput = z.infer<typeof Verify2faSchema>;

// ── 2FA enable (confirm TOTP before persisting secret) ───────────────────────
export const Enable2faSchema = z.object({
  /** 6-digit TOTP code to confirm user has scanned the QR correctly */
  code: z.string().length(6).regex(/^\d{6}$/),
});
export type Enable2faInput = z.infer<typeof Enable2faSchema>;

// ── Password reset — request ──────────────────────────────────────────────────
export const RequestPasswordResetSchema = z.object({
  email,  // OTP sent to email, not SMS
});
export type RequestPasswordResetInput = z.infer<typeof RequestPasswordResetSchema>;

// ── Password reset — verify OTP + set new password ───────────────────────────
export const ResetPasswordSchema = z.object({
  email,
  otp: z.string().length(6).regex(/^\d{6}$/),
  newPassword: password,
});
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
