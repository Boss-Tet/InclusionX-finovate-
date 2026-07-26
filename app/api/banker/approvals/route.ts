import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { formatMWK } from "@/lib/utils/money";

export async function GET() {
  try {
    const approvals = await prisma.bankLoanApplication.findMany({
      include: {
        group: {
          include: {
            _count: {
              select: { members: true },
            },
            contributions: {
              where: { status: "APPROVED" },
            }
          }
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedApprovals = approvals.map((app: any) => {
      const totalSavings = app.group.contributions.reduce((sum: number, c: any) => sum + c.amountTambala, 0);

      // Convert DB status to frontend UI status
      let status: "pending" | "approved" | "rejected" = "pending";
      if (app.status === "APPROVED" || app.status === "DISBURSED" || app.status === "REPAID") {
        status = "approved";
      } else if (app.status === "REJECTED" || app.status === "DEFAULTED") {
        status = "rejected";
      }

      return {
        id: app.id,
        group: app.group.name,
        amount: formatMWK(app.amountTambala),
        purpose: app.purpose,
        members: app.group._count.members,
        savings: formatMWK(totalSavings),
        status,
        score: app.score ?? 0,
      };
    });

    return NextResponse.json({ approvals: formattedApprovals });
  } catch (error) {
    console.error("Error fetching banker approvals:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
