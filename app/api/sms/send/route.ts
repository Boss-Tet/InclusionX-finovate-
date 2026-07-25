import { NextResponse } from 'next/server';
import { NotificationsController } from '../../../../controllers/notifications/notifications.controller';

export async function POST(req: Request) {
  try {
    // Future: Extract user session for role-based access and rate limits
    const body = await req.json();
    const { to, message, senderId } = body;

    if (!to || !message) {
      return NextResponse.json({ error: 'Missing required fields: to, message' }, { status: 400 });
    }

    const result = await NotificationsController.sms({ to, message, senderId });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, result: result.result });
  } catch (error: any) {
    console.error('SMS API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
