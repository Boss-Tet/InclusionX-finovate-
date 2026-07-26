import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: Request) {
  try {
    const role = req.headers.get('x-caller-platform-role');
    
    // Allow Chairperson, Treasurer, Secretary, Bank Officer, Admin
    if (!role || role === "MEMBER") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Get group ID from query params
    const { searchParams } = new URL(req.url);
    const groupId = searchParams.get("groupId");

    if (!groupId) {
      return new NextResponse("Missing groupId", { status: 400 });
    }

    const entries = await db.ledgerEntry.findMany({
      where: { groupId },
      orderBy: { createdAt: "asc" },
    });

    // Generate CSV
    const headers = ["ID,Date,Type,Amount(Tambala),Direction,BalanceAfter,Reason"];
    const rows = entries.map((e: any) => 
      `${e.id},${e.createdAt.toISOString()},${e.entryType},${e.amountTambala},${e.direction},${e.balanceAfter || ""},"${e.reason || ""}"`
    );

    const csvContent = headers.concat(rows).join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="ledger_export_${groupId}.csv"`,
      },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
