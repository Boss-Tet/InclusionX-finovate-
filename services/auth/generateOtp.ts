// services/auth/generateOtp.ts

/**
 * Generates a cryptographically secure 6-digit OTP string.
 * Uses crypto.getRandomValues (available in Edge + Node.js) — no Math.random.
 */
export function generateOtp(): string {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  // Map to 100000–999999 range (always 6 digits)
  const code = 100000 + (buf[0] % 900000);
  return String(code);
}
