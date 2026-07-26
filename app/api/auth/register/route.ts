// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { handleRegister } from '@/controllers/auth/handleRegister';
import { RegisterSchema } from '@/lib/validations/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim();
    const result = await handleRegister(parsed.data, ip);
    return NextResponse.json(result, { status: result.success ? 201 : result.code === 'CONFLICT' ? 409 : 400 });
  } catch (err) {
    console.error('[POST /api/auth/register]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
