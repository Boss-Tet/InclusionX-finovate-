// =============================================================================
// app/api/auth/login/route.ts
// Sets the JWT in an httpOnly, SameSite=Lax cookie on success.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { handleLogin } from '@/controllers/auth/handleLogin';
import { LoginSchema } from '@/lib/validations/auth';

const COOKIE_NAME = 'vsla_token';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(req: NextRequest) {
  try {
    const parsed = LoginSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim();
    const ua = req.headers.get('user-agent') ?? undefined;

    const result = await handleLogin(parsed.data, { ipAddress: ip, userAgent: ua });

    if (!result.success) {
      const status = result.code === 'ACCOUNT_LOCKED' ? 429 : result.code === 'FORBIDDEN' ? 403 : 401;
      return NextResponse.json(result, { status });
    }

    const res = NextResponse.json(
      { success: true, data: { requires2fa: result.data.requires2fa } },
      { status: 200 }
    );

    // Set httpOnly cookie — JS cannot read this, protecting against XSS.
    res.cookies.set(COOKIE_NAME, result.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: result.data.requires2fa ? 300 : COOKIE_MAX_AGE, // 5 min for pending_2fa
    });

    return res;
  } catch (err) {
    console.error('[POST /api/auth/login]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
