import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { formatMWK } from "@/lib/utils/money";
import { format } from "date-fns";

export async function GET() {
  try {
    const groups = await prisma.vslaGroup.findMany({
      include: {
        healthScores: {
          orderBy: { computedAt: 'desc' },
          take: 1
        },
        loans: {
          where: { status: { in: ["OVERDUE", "REPAYING"] } }
        },
        contributions: {
          where: { status: "APPROVED" }
        }
      }
    });

    let highRiskCount = 0;
    let mediumRiskCount = 0;
    
    const flags: any[] = [];
    
    // Process groups for risk flags
    groups.forEach((g: any) => {
      const score = g.healthScores[0]?.score || 0;
      const totalSavings = g.contributions.reduce((sum: number, c: any) => sum + c.amountTambala, 0);
      const totalLoans = g.loans.reduce((sum: number, l: any) => sum + l.principalTambala, 0);
      const overdueLoans = g.loans.filter((l: any) => l.status === "OVERDUE");
      
      let severity: "high" | "medium" | "low" = "low";
      let issue = "";

      if (score < 50) {
        highRiskCount++;
        severity = "high";
        issue = "Critically low health score";
      } else if (score < 75 || overdueLoans.length > 0) {
        mediumRiskCount++;
        severity = "medium";
        issue = overdueLoans.length > 0 ? `Overdue loans: ${overdueLoans.length}` : "Health score below 75";
      }

      if (severity === "high" || severity === "medium") {
        flags.push({
          id: `RF-${g.id.substring(0,6)}`,
          group: g.name,
          issue,
          severity,
          date: format(new Date(), "dd MMM yyyy"),
          loans: formatMWK(totalLoans),
          savings: formatMWK(totalSavings),
        });
      }
    });

    return NextResponse.json({
      metrics: {
        highRiskCount: highRiskCount.toString(),
        mediumRiskCount: mediumRiskCount.toString(),
        complianceScore: "87%", // Mocking global score calculation for MVP
        breakdown: [
          { label: "Loan Repayment Rate", pct: 91 },
          { label: "Meeting Attendance", pct: 84 },
          { label: "Document Completeness", pct: 79 },
          { label: "Financial Reporting", pct: 95 }
        ]
      },
      flags
    });

  } catch (error) {
    console.error("Error fetching banker risk:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
