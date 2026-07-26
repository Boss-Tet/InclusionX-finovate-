import db from "@/lib/db";

export async function resolveTicket(ticketId: string) {
  return await db.supportTicket.update({
    where: { id: ticketId },
    data: {
      status: "RESOLVED",
      resolvedAt: new Date(),
    },
  });
}
