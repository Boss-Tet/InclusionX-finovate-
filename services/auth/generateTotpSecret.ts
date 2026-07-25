// =============================================================================
// services/auth/generateTotpSecret.ts
// Owned by: Jabari (helping Orama)
//
// Generates a base32 TOTP secret compatible with Google Authenticator (RFC 6238).
// Returns both the secret and a QR code otpauth:// URL for the frontend.
//
// Uses otplib v12 top-level sync API: generateSecret + generateURI.
// =============================================================================

import { generateSecret, generateURI } from 'otplib';

interface TotpSetupResult {
  secret: string;       // base32 — store encrypted in User.twoFactorSecret
  otpauthUrl: string;   // for QR code rendering (otpauth://)
}

const APP_NAME = 'VSLA Connect';

/**
 * Generates a fresh TOTP secret for a user.
 * The secret must NOT be persisted until the user confirms it (handleEnable2fa).
 */
export function generateTotpSecret(userPhoneNumber: string): TotpSetupResult {
  const secret = generateSecret();

  // otpauth:// URL — Kilotet renders this as a QR code (e.g. qrcode.react).
  const otpauthUrl = generateURI({
    label: `${APP_NAME}:${userPhoneNumber}`,
    issuer: APP_NAME,
    secret,
  });

  return { secret, otpauthUrl };
}
