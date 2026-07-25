// services/auth/hashOtp.ts

/**
 * SHA-256 hex digest of an OTP code.
 * Stored in DB instead of raw OTP — prevents plaintext leakage in DB dumps.
 * Works in Edge Runtime and Node.js (Web Crypto API).
 */
export async function hashOtp(rawOtp: string): Promise<string> {
  const data = new TextEncoder().encode(rawOtp);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Constant-time equality check for two hex strings (prevents timing attacks). */
export function otpHashesMatch(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
