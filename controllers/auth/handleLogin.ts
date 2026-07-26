// =============================================================================
// controllers/auth/handleLogin.ts
// Owned by: Jabari (helping Orama)
//
// POST /api/auth/login
// Validates credentials, enforces brute-force lockout, then:
//   - If 2FA disabled  → issues full session JWT
//   - If 2FA enabled   → issues short-lived pending_2fa JWT (5 min)
//                        → frontend must call /api/auth/2fa/verify
// =============================================================================

import db from '@/lib/db';
import { verifyPassword } from '@/services/auth/verifyPassword';
import { createSession } from '@/services/auth/createSession';
import { LoginInput } from '@/lib/validations/auth';
import { ApiResponse } from '@/types/financial';

const MAX_FAILURES = 5;
const LOCKOUT_MINUTES = 15;

interface LoginSuccess {
  token: string;
  requires2fa: boolean;
}

export async function handleLogin(
  input: LoginInput,
  meta: { ipAddress?: string; userAgent?: string }
): Promise<ApiResponse<LoginSuccess>> {
  const { email, password } = input;

  const user = await db.user.findUnique({
    where: { email },
    select: {
      id: true,
      passwordHash: true,
      platformRole: true,
      isActive: true,
      isEmailVerified: true,
      twoFactorEnabled: true,
      failedLoginAttempts: true,
      lockedUntil: true,
    },
  });

  // Generic error — don't reveal whether the phone exists (prevents enumeration).
  const INVALID_CREDS = { success: false as const, error: 'Invalid email or password.', code: 'INVALID_CREDENTIALS' };

  if (!user) return INVALID_CREDS;
  if (!user.isActive) return { success: false, error: 'Account is deactivated. Contact support.', code: 'FORBIDDEN' };
  if (!user.isEmailVerified) return { success: false, error: 'Email not verified. Check your inbox for the verification code.', code: 'EMAIL_NOT_VERIFIED' };

  // Brute-force lockout check.
  if (user.lockedUntil && user.lockedUntil > new Date()) {
    const retryAfter = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 1000);
    return {
      success: false,
      error: `Account locked. Try again in ${Math.ceil(retryAfter / 60)} minute(s).`,
      code: 'ACCOUNT_LOCKED',
    };
  }

  const passwordOk = await verifyPassword(password, user.passwordHash);

  if (!passwordOk) {
    const newFailures = user.failedLoginAttempts + 1;
    const shouldLock = newFailures >= MAX_FAILURES;

    await db.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: newFailures,
        ...(shouldLock
          ? { lockedUntil: new Date(Date.now() + LOCKOUT_MINUTES * 60_000) }
          : {}),
      },
    });

    if (shouldLock) {
      return {
        success: false,
        error: `Too many failed attempts. Account locked for ${LOCKOUT_MINUTES} minutes.`,
        code: 'ACCOUNT_LOCKED',
      };
    }

    return INVALID_CREDS;
  }

  // Reset failure count + update audit fields on success.
  await db.user.update({
    where: { id: user.id },
    data: {
      failedLoginAttempts: 0,
      lockedUntil: null,
      lastLoginAt: new Date(),
      lastLoginIp: meta.ipAddress ?? null,
    },
  });

  // 2FA enabled → issue pending_2fa token, don't create a real session yet.
  if (user.twoFactorEnabled) {
    const { jwt } = await createSession({
      userId: user.id,
      platformRole: user.platformRole,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
      type: 'pending_2fa',
    });
    return { success: true, data: { token: jwt, requires2fa: true } };
  }

  // Full session.
  const { jwt } = await createSession({
    userId: user.id,
    platformRole: user.platformRole,
    ipAddress: meta.ipAddress,
    userAgent: meta.userAgent,
    type: 'session',
  });

  return { success: true, data: { token: jwt, requires2fa: false } };
}
