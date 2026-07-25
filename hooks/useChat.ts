'use client';

import { useState } from 'react';
import { MOCK_GROUP_MESSAGES, MOCK_AI_MESSAGES, ChatMessage } from '@/lib/mock/chatMock';

export function useChat() {
  const [groupMessages, setGroupMessages] = useState<ChatMessage[]>(MOCK_GROUP_MESSAGES);
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>(MOCK_AI_MESSAGES);

  const sendGroupMessage = (content: string) => {
    const newMsg: ChatMessage = {
      id: `group-${Date.now()}`,
      senderId: 'usr-mem-01',
      senderName: 'You',
      senderRole: 'Member',
      content,
      timestamp: 'Just now',
    };
    setGroupMessages((prev) => [...prev, newMsg]);
  };

  const sendAiMessage = (content: string) => {
    const newMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      senderId: 'usr-mem-01',
      senderName: 'You',
      content,
      timestamp: 'Just now',
    };
    setAiMessages((prev) => [...prev, newMsg]);
  };

  return {
    groupMessages,
    aiMessages,
    sendGroupMessage,
    sendAiMessage,
  };
}
