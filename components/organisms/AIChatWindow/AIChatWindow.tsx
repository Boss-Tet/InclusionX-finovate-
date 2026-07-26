import React, { useState } from 'react';
import { Card } from '@/components/atoms/Card';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { ChatBubble } from '@/components/molecules/ChatBubble';
import { ChatMessage } from '@/lib/mock/chatMock';
import { Bot, Send, Sparkles } from 'lucide-react';

export interface AIChatWindowProps {
  initialMessages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

export const AIChatWindow: React.FC<AIChatWindowProps> = ({
  initialMessages,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      senderId: 'usr-mem-01',
      senderName: 'You',
      content: inputText,
      timestamp: 'Just now',
    };
    setMessages((prev) => [...prev, userMsg]);
    onSendMessage(inputText);
    setInputText('');

    // Simulated AI response
    setTimeout(() => {
      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        senderId: 'ai-assistant',
        senderName: 'VSLA Finovate AI',
        content: `Based on your group's repayment interest rate (10%) and your savings balance of MWK 450,000, you are eligible for up to MWK 300,000 in micro-loans with a maximum 3-month term.`,
        timestamp: 'Just now',
        isAi: true,
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 800);
  };

  const quickPrompts = [
    'How much loan can I apply for?',
    'What is my health score impact?',
    'Explain simple vs compound interest',
  ];

  return (
    <Card className="flex flex-col h-[550px] p-0 overflow-hidden border border-emerald-100 dark:border-slate-800">
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold flex items-center gap-1.5">
              VSLA Finovate AI Advisor <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </h3>
            <p className="text-[11px] text-emerald-100">
              Personal financial coach & credit advisor
            </p>
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

      <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {quickPrompts.map((p) => (
            <button
              key={p}
              onClick={() => setInputText(p)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 whitespace-nowrap dark:bg-emerald-950/60 dark:text-emerald-300 cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask AI about loans, savings, or health score..."
            className="flex-1"
          />
          <Button type="submit" variant="primary" size="md">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
};
