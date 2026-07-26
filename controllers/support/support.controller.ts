import { createTicket } from "@/services/support/createTicket";
import { getTickets } from "@/services/support/getTickets";
import { resolveTicket } from "@/services/support/resolveTicket";

export class SupportController {
  static async create(reporterId: string, subject: string, description: string) {
    if (!subject || !description) {
      return { success: false, error: "Subject and description are required" };
    }
    
    try {
      const ticket = await createTicket({ reporterId, subject, description });
      return { success: true, ticket };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  static async list(userId: string, role: string) {
    try {
      const tickets = await getTickets(userId, role);
      return { success: true, tickets };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  static async resolve(ticketId: string, role: string) {
    if (role !== "ADMIN" && role !== "BANK_OFFICER") {
      return { success: false, error: "Unauthorized: Only Admins or Bank Officers can resolve tickets." };
    }

    try {
      const ticket = await resolveTicket(ticketId);
      return { success: true, ticket };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
