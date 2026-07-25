// =============================================================================
// app/api/ledger/route.ts
// Owned by: Jabari (Financial Logic)
//
// GET /api/ledger?groupId=&from=&to=&page=&pageSize= — paginated ledger view
// Accessible to: Treasurer, Chairperson, Secretary, Bank Officer, Admin
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { handleGetLedger } from '@/controllers/ledger/handleGetLedger';
import { GetLedgerQuerySchema } from '@/lib/validations/ledger';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = GetLedgerQuerySchema.safeParse(Object.fromEntries(searchParams.entries()));
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }

    const callerRole = req.headers.get('x-caller-role') ?? '';

    const result = await handleGetLedger({ ...parsed.data, callerRole });
    const status = result.success ? 200 : result.code === 'FORBIDDEN' ? 403 : 400;
    return NextResponse.json(result, { status });
  } catch (err) {
    console.error('[GET /api/ledger]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
