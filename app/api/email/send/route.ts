import { NextResponse } from 'next/server';
import { NotificationsController } from '../../../../controllers/notifications/notifications.controller';

export async function POST(req: Request) {
  try {
    // Future: Extract user session for role-based access and rate limits
    const body = await req.json();
    const { to, subject, html } = body;

    if (!to || !subject || !html) {
      return NextResponse.json({ error: 'Missing required fields: to, subject, html' }, { status: 400 });
    }

    const result = await NotificationsController.email({ to, subject, html });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (error: any) {
    console.error('Email API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
