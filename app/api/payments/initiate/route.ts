import { NextResponse } from 'next/server';
import { PaymentsController } from '../../../../controllers/payments/payments.controller';

export async function POST(req: Request) {
  try {
    // Future: Extract user session to ensure they are initiating payment for themselves
    const body = await req.json();
    const { amountTambala, email, firstName, lastName, txRef, description } = body;

    if (!amountTambala || !email || !firstName || !lastName || !txRef) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await PaymentsController.initializeTransaction({
      amountTambala,
      email,
      firstName,
      lastName,
      txRef,
      description
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Payment Initiate API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
