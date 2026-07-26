import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { formatMWK } from "@/lib/utils/money";
import { format } from "date-fns";

export async function GET() {
  try {
    // 1. Fetch recent contributions across all groups to simulate the "Bank Ledger" of deposits
    const deposits = await prisma.contribution.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      include: { group: true }
    });
    
    // 2. Fetch withdrawal requests
    const withdrawals = await prisma.withdrawalRequest.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { group: true }
    });

    // 3. Map into the unified ledger format
    const ledger = [
      ...deposits.map((d: any) => ({
        id: `DEP-${d.id}`,
        group: d.group.name,
        amount: formatMWK(d.amountTambala),
        date: format(new Date(d.createdAt), "dd MMM yyyy hh:mm a"),
        type: "deposit",
        method: "Bank Transfer", 
        timestamp: new Date(d.createdAt).getTime(),
      })),
      ...withdrawals.map((w: any) => ({
        id: `WTH-${w.id}`,
        group: w.group.name,
        amount: formatMWK(w.amountTambala),
        date: format(new Date(w.createdAt), "dd MMM yyyy hh:mm a"),
        type: "withdrawal",
        method: "Cash",
        timestamp: new Date(w.createdAt).getTime(),
      }))
    ].sort((a, b) => b.timestamp - a.timestamp).slice(0, 30);

    // 4. Calculate summary totals
    const today = new Date();
    today.setHours(0,0,0,0);
    
    const todayDeposits = deposits
      .filter((d: any) => new Date(d.createdAt) >= today)
      .reduce((sum: number, d: any) => sum + d.amountTambala, 0);

    const totalBalance = await prisma.contribution.aggregate({
      _sum: { amountTambala: true },
      where: { status: "APPROVED" }
    }).then((res: any) => res._sum.amountTambala || 0);

    const pendingReconciliation = await prisma.contribution.count({
      where: { status: "PENDING" }
    });

    return NextResponse.json({
      ledger,
      summaryTotals: {
        depositsToday: formatMWK(todayDeposits),
        pendingReconciliation,
        totalBalance: formatMWK(totalBalance)
      }
    });

  } catch (error) {
    console.error("Error fetching banker ledger:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
