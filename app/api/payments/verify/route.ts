import { NextResponse } from 'next/server';
import { PaymentsController } from '@/controllers/payments/payments.controller';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const txRef = searchParams.get('txRef');

    if (!txRef) {
      return NextResponse.json({ error: 'Missing txRef parameter' }, { status: 400 });
    }

    const result = await PaymentsController.checkStatus(txRef);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Payment Verify API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
