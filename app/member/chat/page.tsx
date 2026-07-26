'use client';

import React from 'react';
import { MemberShell } from '@/components/templates/MemberShell';
import { ChatWindow } from '@/components/organisms/ChatWindow';
import { useChat } from '@/hooks/useChat';

export default function MemberChatPage() {
  const { groupMessages, sendGroupMessage } = useChat();

  return (
    <MemberShell>
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
            VSLA Circle Peer Chat
          </h1>
          <p className="text-xs text-slate-500">
            Communicate directly with your group members, secretary, and treasurer
          </p>
        </div>

        <ChatWindow
          messages={groupMessages}
          groupName="Tiyanjane Women VSLA"
          onSendMessage={sendGroupMessage}
        />
      </div>
    </MemberShell>
  );
}
