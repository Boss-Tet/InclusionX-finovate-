// services/auth/hashPassword.ts
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

/** Hashes a plaintext password with bcrypt. Never store the raw value. */
export async function hashPassword(plaintext: string): Promise<string> {
  return bcrypt.hash(plaintext, SALT_ROUNDS);
}
