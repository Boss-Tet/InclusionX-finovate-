import { db } from "@/lib/db";

export async function getTickets(userId: string, role: string) {
  if (role === "ADMIN" || role === "BANK_OFFICER") {
    // Admins and Bank Officers see all tickets, ordered by newest first
    return await db.supportTicket.findMany({
      orderBy: { createdAt: "desc" },
      include: { reporter: { select: { fullName: true, phoneNumber: true } } },
    });
  }

  // Members only see their own tickets
  return await db.supportTicket.findMany({
    where: { reporterId: userId },
    orderBy: { createdAt: "desc" },
  });
}
