'use client';

import React from 'react';
import { MemberShell } from '@/components/templates/MemberShell';
import { AIChatWindow } from '@/components/organisms/AIChatWindow';
import { useChat } from '@/hooks/useChat';

export default function AIAssistantPage() {
  const { aiMessages, sendAiMessage } = useChat();

  return (
    <MemberShell>
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
            VSLA Finovate AI Advisor
          </h1>
          <p className="text-xs text-slate-500">
            Your personalized AI assistant for credit calculations, savings strategy, and financial literacy
          </p>
        </div>

        <AIChatWindow
          initialMessages={aiMessages}
          onSendMessage={sendAiMessage}
        />
      </div>
    </MemberShell>
  );
}
