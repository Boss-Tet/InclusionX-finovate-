import { NextResponse } from 'next/server';
import { AIController } from '../../../../controllers/ai/ai.controller';

export async function POST(req: Request) {
  try {
    // Future: Extract user session for role-based access and rate limits
    const body = await req.json();
    const { history, systemInstruction } = body;

    if (!history || !Array.isArray(history)) {
      return NextResponse.json({ error: 'Missing or invalid chat history array' }, { status: 400 });
    }

    const result = await AIController.getChatReply(history, systemInstruction);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ reply: result.text });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
