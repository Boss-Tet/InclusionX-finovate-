import { NextResponse } from "next/server";
import { SupportController } from "@/controllers/support/support.controller";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const role = req.headers.get('x-caller-platform-role');
    if (!role) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const result = await SupportController.resolve(params.id, role);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 403 });
    }

    return NextResponse.json({ ticket: result.ticket });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
