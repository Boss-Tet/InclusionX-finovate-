import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { formatMWK } from "@/lib/utils/money";

export async function GET() {
  try {
    const groups = await prisma.vslaGroup.findMany({
      include: {
        contributions: {
          where: { status: "APPROVED" }
        },
        loans: {
          where: { status: { in: ["DISBURSED", "REPAYING"] } }
        }
      }
    });

    const activeGroups = groups.filter((g: any) => g.status === "ACTIVE").length;
    let totalSavings = 0;
    let totalLoans = 0;

    groups.forEach((g: any) => {
      totalSavings += g.contributions.reduce((sum: number, c: any) => sum + c.amountTambala, 0);
      totalLoans += g.loans.reduce((sum: number, l: any) => sum + l.principalTambala, 0);
    });

    const portfolioValue = totalSavings + totalLoans; // Simplified value equation

    return NextResponse.json({
      kpis: [
        { label: "Total Portfolio Value",  value: formatMWK(portfolioValue),  delta: "+8.4% MoM",  color: "text-[#2F6FED] bg-[#E8EFFD]", icon: "wallet" },
        { label: "Loan Disbursements",     value: formatMWK(totalLoans),  delta: "+6.7% MoM",  color: "text-[#16A34A] bg-[#E5F7EA]", icon: "hand-coin" },
        { label: "Repayment Rate",         value: "91%",         delta: "Target: 90%",color: "text-[#16A34A] bg-[#E5F7EA]", icon: "trending-up" },
        { label: "Active Groups",          value: `${activeGroups}/${groups.length}`,       delta: "0 flagged",  color: "text-[#F97316] bg-[#FEF0E1]", icon: "users" },
      ]
    });

  } catch (error) {
    console.error("Error fetching banker reports:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
