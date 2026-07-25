// app/api/auth/verify-phone/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { handleVerifyPhone } from '@/controllers/auth/handleVerifyPhone';
import { VerifyPhoneSchema } from '@/lib/validations/auth';

export async function POST(req: NextRequest) {
  try {
    const parsed = VerifyPhoneSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }
    const result = await handleVerifyPhone(parsed.data);
    const status = result.success ? 200 : result.code === 'NOT_FOUND' ? 404 : result.code === 'TOO_MANY_ATTEMPTS' ? 429 : 400;
    return NextResponse.json(result, { status });
  } catch (err) {
    console.error('[POST /api/auth/verify-phone]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
