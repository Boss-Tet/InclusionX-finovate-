import db from "@/lib/db";

export interface CreateTicketOptions {
  reporterId: string;
  subject: string;
  description: string;
}

export async function createTicket({ reporterId, subject, description }: CreateTicketOptions) {
  return await db.supportTicket.create({
    data: {
      reporterId,
      subject,
      description,
      status: "OPEN",
    },
  });
}
