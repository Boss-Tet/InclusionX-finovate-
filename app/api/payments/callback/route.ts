import { NextResponse } from 'next/server';
import { PaymentsController } from '../../../../controllers/payments/payments.controller';

export async function POST(req: Request) {
  try {
    // Note: This endpoint must remain public so PayChangu can reach it.
    // Security should be handled by verifying the PayChangu signature header.
    const payload = await req.json();

    const result = await PaymentsController.processWebhook(payload);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Payment Webhook API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
