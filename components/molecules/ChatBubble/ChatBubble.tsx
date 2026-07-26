import React from 'react';
import { Avatar } from '@/components/atoms/Avatar';
import { ChatMessage } from '@/lib/mock/chatMock';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ChatBubbleProps {
  message: ChatMessage;
  isCurrentUser?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isCurrentUser }) => {
  const isAi = message.isAi;

  return (
    <div
      className={cn(
        'flex items-start gap-3 my-2.5 max-w-[85%] sm:max-w-[75%]',
        isCurrentUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
      )}
    >
      {isAi ? (
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shrink-0 shadow-sm">
          <Bot className="w-5 h-5" />
        </div>
      ) : (
        <Avatar
          name={message.senderName}
          src={message.avatarUrl}
          size="sm"
          className="shrink-0"
        />
      )}

      <div className="space-y-1">
        <div
          className={cn(
            'flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400',
            isCurrentUser && 'justify-end'
          )}
        >
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {isCurrentUser ? 'You' : message.senderName}
          </span>
          {message.senderRole && !isAi && (
            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full font-medium">
              {message.senderRole}
            </span>
          )}
          <span>• {message.timestamp}</span>
        </div>

        <div
          className={cn(
            'rounded-2xl px-4 py-3 text-sm font-normal leading-relaxed shadow-2xs',
            isCurrentUser
              ? 'bg-emerald-600 text-white rounded-tr-xs'
              : isAi
              ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-950 dark:from-emerald-950/40 dark:to-teal-950/40 dark:border-emerald-800 dark:text-emerald-100 rounded-tl-xs'
              : 'bg-white border border-slate-200/80 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 rounded-tl-xs'
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};
