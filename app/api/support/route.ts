import { NextResponse } from "next/server";
import { SupportController } from "@/controllers/support/support.controller";
import { requireAuth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await requireAuth(req);
    const { subject, description } = await req.json();

    const result = await SupportController.create(user.id, subject, description);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ ticket: result.ticket });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const user = await requireAuth(req);

    const result = await SupportController.list(user.id, user.platformRole);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ tickets: result.tickets });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
