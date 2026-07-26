import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { formatMWK } from "@/lib/utils/money";

export async function GET() {
  try {
    const groups = await prisma.vslaGroup.findMany({
      include: {
        _count: {
          select: { members: true },
        },
        contributions: {
          where: { status: "APPROVED" },
        },
        loans: {
          where: { status: { in: ["DISBURSED", "REPAYING", "OVERDUE"] } },
        },
        healthScores: {
          orderBy: { computedAt: "desc" },
          take: 1,
        }
      },
    });

    const formattedGroups = groups.map((g: any) => {
      const totalSavings = g.contributions.reduce((sum: number, c: any) => sum + c.amountTambala, 0);
      const totalLoans = g.loans.reduce((sum: number, l: any) => sum + l.principalTambala, 0);
      
      const health = g.healthScores[0]?.score || 0;
      let risk: "low" | "medium" | "high" = "medium";
      let status: "active" | "flagged" = "active";
      let theme: "green" | "blue" | "purple" | "orange" | "red" | "gray" = "blue";

      if (health >= 80) { risk = "low"; theme = "green"; }
      else if (health >= 50) { risk = "medium"; theme = "orange"; }
      else { risk = "high"; theme = "red"; status = "flagged"; }

      return {
        id: g.id,
        code: g.inviteCode,
        name: g.name,
        members: g._count.members,
        savings: formatMWK(totalSavings),
        loans: formatMWK(totalLoans),
        status,
        risk,
        theme,
      };
    });

    return NextResponse.json({ groups: formattedGroups });
  } catch (error) {
    console.error("Error fetching banker portfolio:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
