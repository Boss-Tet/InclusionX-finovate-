import { NextResponse } from 'next/server';
import { MediaController } from '../../../../controllers/media/media.controller';
import { writeFile } from 'fs/promises';
import path from 'path';
import os from 'os';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  try {
    // Future: Extract user session for role-based access and rate limits
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Read file data
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to a temporary location to pass to Cloudinary provider
    const tempPath = path.join(os.tmpdir(), `${randomUUID()}-${file.name}`);
    await writeFile(tempPath, buffer);

    const result = await MediaController.uploadImage(tempPath);

    // Future: Delete temp file after upload

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, url: result.url, publicId: result.publicId });
  } catch (error: any) {
    console.error('Media Upload API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
