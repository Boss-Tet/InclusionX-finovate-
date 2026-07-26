// =============================================================================
// types/chat.ts
// Owned by: Orama
// =============================================================================

export interface ChatSender {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  platformRole: string;
}

export interface ChatMessageItem {
  id: string;
  groupId: string;
  senderId: string;
  body: string;
  sentAt: string;
  sender: ChatSender;
}

export interface SendMessagePayload {
  groupId: string;
  body: string;
}

export interface GetMessagesQuery {
  groupId: string;
  limit?: number;
  before?: string; // Cursor for pagination (message ID or ISO timestamp)
}