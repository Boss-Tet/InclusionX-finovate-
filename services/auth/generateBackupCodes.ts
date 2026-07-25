// =============================================================================
// services/auth/generateBackupCodes.ts
// Owned by: Jabari (helping Orama)
//
// Generates 10 one-time 2FA backup codes.
// Raw codes are returned to the user ONCE (never stored raw).
// Hashed codes are stored in User.twoFactorBackupCodes[].
// =============================================================================

import bcrypt from 'bcryptjs';

const CODE_COUNT = 10;
const SALT_ROUNDS = 10; // lower than password — backup codes are short-lived

function randomHex(bytes: number): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return Array.from(buf).map((b) => b.toString(16).padStart(2, '0')).join('');
}

interface BackupCodesResult {
  /** Raw codes — return to user ONCE, then discard. Format: "xxxx-xxxx" */
  rawCodes: string[];
  /** bcrypt-hashed codes — store in User.twoFactorBackupCodes */
  hashedCodes: string[];
}

export async function generateBackupCodes(): Promise<BackupCodesResult> {
  const rawCodes: string[] = Array.from({ length: CODE_COUNT }, () => {
    const hex = randomHex(4); // 4 bytes = 8 hex chars
    return `${hex.slice(0, 4)}-${hex.slice(4, 8)}`; // "a1b2-c3d4"
  });

  const hashedCodes = await Promise.all(
    rawCodes.map((code) => bcrypt.hash(code, SALT_ROUNDS))
  );

  return { rawCodes, hashedCodes };
}

/**
 * Checks a provided backup code against all stored hashes.
 * Returns the index of the matching hash (caller should remove it after use).
 * Returns -1 if no match.
 */
export async function findMatchingBackupCode(
  rawCode: string,
  hashedCodes: string[]
): Promise<number> {
  for (let i = 0; i < hashedCodes.length; i++) {
    const match = await bcrypt.compare(rawCode, hashedCodes[i]);
    if (match) return i;
  }
  return -1;
}
