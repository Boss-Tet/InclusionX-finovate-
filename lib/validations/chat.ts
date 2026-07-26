// =============================================================================
// lib/validations/chat.ts
// Owned by: Orama 
// Zod schemas for chats
// =============================================================================


import { z } from "zod";

export const sendMessageSchema = z.object({
  groupId: z.string().uuid({ message: "Invalid group ID" }),
  body: z
    .string()
    .trim()
    .min(1, { message: "Message cannot be empty" })
    .max(2000, { message: "Message cannot exceed 2000 characters" }),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;