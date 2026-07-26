import React, { useState } from 'react';
import { Card } from '@/components/atoms/Card';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { ChatBubble } from '@/components/molecules/ChatBubble';
import { ChatMessage } from '@/lib/mock/chatMock';
import { MessageSquare, Send } from 'lucide-react';

export interface ChatWindowProps {
  messages: ChatMessage[];
  groupName: string;
  onSendMessage: (text: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages: initialMessages,
  groupName,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'usr-mem-01',
      senderName: 'You',
      senderRole: 'Member',
      content: inputText,
      timestamp: 'Just now',
    };
    setMessages((prev) => [...prev, newMsg]);
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <Card className="flex flex-col h-[550px] p-0 overflow-hidden border border-slate-200 dark:border-slate-800">
      <div className="bg-slate-900 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold">{groupName} Discussion</h3>
            <p className="text-[11px] text-slate-400">25 active members in circle</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-slate-900/40">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg}
            isCurrentUser={msg.senderName === 'You'}
          />
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2"
      >
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Write a message to group members..."
          className="flex-1"
        />
        <Button type="submit" variant="primary" size="md">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </Card>
  );
};
