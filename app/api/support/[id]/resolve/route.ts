import { NextResponse } from "next/server";
import { SupportController } from "@/controllers/support/support.controller";
import { requireAuth } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await requireAuth(req);
    const result = await SupportController.resolve(params.id, user.platformRole);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 403 });
    }

    return NextResponse.json({ ticket: result.ticket });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
