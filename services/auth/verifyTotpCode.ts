// services/auth/verifyTotpCode.ts
//
// Uses otplib v12 top-level sync API: verifySync.

import { verifySync } from 'otplib';

/**
 * Verifies a 6-digit TOTP code against a user's stored secret.
 * verifySync returns { valid, delta, epoch, timeStep } or throws.
 * Window of ±1 step (±30s) is the otplib default.
 */
export function verifyTotpCode(code: string, secret: string): boolean {
  try {
    const result = verifySync({ token: code, secret });
    return result.valid === true;
  } catch {
    return false;
  }
}
