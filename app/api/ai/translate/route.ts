import { NextResponse } from 'next/server';
import { AIController } from '@/controllers/ai/ai.controller';

export async function POST(req: Request) {
  try {
    // Future: Extract user session for role-based access and rate limits
    const body = await req.json();
    const { text, targetLanguage } = body;

    if (!text || !targetLanguage || !['en', 'ny'].includes(targetLanguage)) {
      return NextResponse.json({ error: 'Missing or invalid text or targetLanguage (must be "en" or "ny")' }, { status: 400 });
    }

    const result = await AIController.translate(text, targetLanguage as 'en' | 'ny');

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ translation: result.translation });
  } catch (error: any) {
    console.error('Translation API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
