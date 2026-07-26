import { NextResponse } from 'next/server';

/**
 * Africa's Talking Incoming SMS Callback
 * Africa's Talking POSTs incoming SMS messages here.
 * Docs: https://developers.africastalking.com/docs/sms/reception
 */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const from = formData.get('from') as string;
    const to = formData.get('to') as string;
    const text = formData.get('text') as string;
    const date = formData.get('date') as string;
    const id = formData.get('id') as string;
    const linkId = formData.get('linkId') as string | null;

    console.log('[Incoming SMS]', { from, to, text, date, id, linkId });

    // Process incoming SMS logic here (e.g., triggering a transaction or replying)
    // For now, we simply log it and acknowledge receipt.

    // Africa's Talking requires a 200 response to acknowledge receipt
    return new NextResponse('OK', { status: 200 });
  } catch (error: any) {
    console.error('[Incoming SMS] Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
