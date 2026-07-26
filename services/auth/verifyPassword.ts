// services/auth/verifyPassword.ts
import bcrypt from 'bcryptjs';

/** Compares a plaintext password against a stored bcrypt hash. */
export async function verifyPassword(
  plaintext: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}
