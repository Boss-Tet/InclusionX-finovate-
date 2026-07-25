// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { handleLogout } from '@/controllers/auth/handleLogout';

const COOKIE_NAME = 'vsla_token';

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.headers.get('x-caller-session-id') ?? '';
    if (sessionId) await handleLogout(sessionId);

    const res = NextResponse.json({ success: true, data: { message: 'Logged out.' } }, { status: 200 });
    // Clear the cookie regardless of session validity.
    res.cookies.set(COOKIE_NAME, '', { httpOnly: true, maxAge: 0, path: '/' });
    return res;
  } catch (err) {
    console.error('[POST /api/auth/logout]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
