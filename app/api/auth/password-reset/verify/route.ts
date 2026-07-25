// app/api/auth/password-reset/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { handleResetPassword } from '@/controllers/auth/handleResetPassword';
import { ResetPasswordSchema } from '@/lib/validations/auth';

const COOKIE_NAME = 'vsla_token';

export async function POST(req: NextRequest) {
  try {
    const parsed = ResetPasswordSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }
    const result = await handleResetPassword(parsed.data);
    const res = NextResponse.json(result, { status: result.success ? 200 : result.code === 'TOO_MANY_ATTEMPTS' ? 429 : 400 });
    if (result.success) {
      // Clear any active session cookie — user must log in fresh.
      res.cookies.set(COOKIE_NAME, '', { httpOnly: true, maxAge: 0, path: '/' });
    }
    return res;
  } catch (err) {
    console.error('[POST /api/auth/password-reset/verify]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
