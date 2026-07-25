// app/api/auth/password-reset/request/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { handleRequestPasswordReset } from '@/controllers/auth/handleRequestPasswordReset';
import { RequestPasswordResetSchema } from '@/lib/validations/auth';

export async function POST(req: NextRequest) {
  try {
    const parsed = RequestPasswordResetSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim();
    const result = await handleRequestPasswordReset(parsed.data, ip);
    return NextResponse.json(result, { status: 200 }); // always 200 — no enumeration
  } catch (err) {
    console.error('[POST /api/auth/password-reset/request]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
