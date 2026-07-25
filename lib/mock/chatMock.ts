export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole?: string;
  avatarUrl?: string;
  content: string;
  timestamp: string;
  isAi?: boolean;
}

export const MOCK_GROUP_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 'usr-chair-01',
    senderName: 'Grace Phiri',
    senderRole: 'Chairperson',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    content: 'Welcome members to our July monthly check-in! Please ensure all share contributions are recorded before Friday.',
    timestamp: '10:15 AM',
  },
  {
    id: 'msg-2',
    senderId: 'usr-treas-01',
    senderName: 'Kondwani Mwale',
    senderRole: 'Treasurer',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content: 'Cashbox verification is complete. Total balance in account is MWK 4,850,000.00.',
    timestamp: '10:30 AM',
  },
  {
    id: 'msg-3',
    senderId: 'usr-mem-01',
    senderName: 'Chifundo Banda',
    senderRole: 'Member',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    content: 'Thank you Kondwani! I have sent my monthly share contribution of MWK 25,000 via Airtel Money.',
    timestamp: '11:05 AM',
  },
];

export const MOCK_AI_MESSAGES: ChatMessage[] = [
  {
    id: 'ai-1',
    senderId: 'ai-assistant',
    senderName: 'VSLA Finovate AI',
    content: 'Hello Chifundo! I am your AI Financial Assistant. How can I help you manage your VSLA savings, loan repayments, or financial health today?',
    timestamp: 'Just now',
    isAi: true,
  },
];
