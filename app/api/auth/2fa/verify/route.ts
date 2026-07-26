// app/api/auth/2fa/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { handleVerify2fa } from '@/controllers/auth/handleVerify2fa';
import { Verify2faSchema } from '@/lib/validations/auth';

const COOKIE_NAME = 'vsla_token';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export async function POST(req: NextRequest) {
  try {
    const parsed = Verify2faSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim();
    const ua = req.headers.get('user-agent') ?? undefined;
    const result = await handleVerify2fa(parsed.data, { ipAddress: ip, userAgent: ua });

    if (!result.success) {
      return NextResponse.json(result, { status: result.code === 'INVALID_TOKEN' ? 401 : 400 });
    }

    const res = NextResponse.json({ success: true }, { status: 200 });
    res.cookies.set(COOKIE_NAME, result.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: COOKIE_MAX_AGE,
    });
    return res;
  } catch (err) {
    console.error('[POST /api/auth/2fa/verify]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
