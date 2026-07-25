import { NextResponse } from 'next/server';
import { NotificationsController } from '../../../controllers/notifications/notifications.controller';

export async function POST(req: Request) {
  try {
    // Africa's Talking sends USSD payload as application/x-www-form-urlencoded
    const formData = await req.formData();
    
    const sessionId = formData.get('sessionId') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const text = formData.get('text') as string;

    if (!sessionId || !phoneNumber || text === null) {
      return new NextResponse('Missing required USSD parameters', { status: 400 });
    }

    // Process USSD logic (returns a plain text string starting with CON or END)
    const responseText = NotificationsController.processUssd(sessionId, phoneNumber, text);

    // USSD endpoints MUST return plain text
    return new NextResponse(responseText, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error: any) {
    console.error('USSD API Error:', error);
    return new NextResponse('END Internal Server Error', { status: 500, headers: { 'Content-Type': 'text/plain' } });
  }
}
