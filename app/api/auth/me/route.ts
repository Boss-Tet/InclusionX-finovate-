// app/api/auth/me/route.ts
// Returns the current user's identity by reading the httpOnly vsla_token cookie.
// Used by the client-side useAuth hook since JS cannot read httpOnly cookies directly.

import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/utils/jwt';
import db from '@/lib/db';

const COOKIE_NAME = 'vsla_token';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Not authenticated.', code: 'UNAUTHENTICATED' }, { status: 401 });
    }

    let payload;
    try {
      payload = await verifyJwt(token);
    } catch {
      return NextResponse.json({ success: false, error: 'Session expired.', code: 'UNAUTHENTICATED' }, { status: 401 });
    }

    // For pending_2fa tokens, return minimal payload — user has not completed auth.
    if (payload.type === 'pending_2fa') {
      return NextResponse.json({
        success: true,
        data: {
          userId: payload.sub,
          platformRole: payload.role,
          sessionId: payload.sessionId,
          type: 'pending_2fa',
        },
      });
    }

    // Fetch user profile from DB to return fullName and other display fields.
    const user = await db.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        fullName: true,
        phoneNumber: true,
        email: true,
        avatarUrl: true,
        platformRole: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      return NextResponse.json({ success: false, error: 'Account not found or deactivated.', code: 'UNAUTHENTICATED' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      data: {
        userId: user.id,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        avatarUrl: user.avatarUrl,
        platformRole: user.platformRole,
        sessionId: payload.sessionId,
        type: 'session',
      },
    });
  } catch (err) {
    console.error('[GET /api/auth/me]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
