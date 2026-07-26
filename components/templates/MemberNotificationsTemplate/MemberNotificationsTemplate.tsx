"use client";

import React from "react";
import { MemberSidebar } from "@/components/organisms/MemberSidebar/MemberSidebar";
import { MobileBottomNav } from "@/components/organisms/MobileBottomNav/MobileBottomNav";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useNotifications, NotificationRecord } from "@/hooks/useNotifications";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function channelIcon(channel: string): React.ReactNode {
  switch (channel) {
    case "PUSH": return <Icon name="bell" className="w-4.5 h-4.5" />;
    case "SMS": return <Icon name="chat" className="w-4.5 h-4.5" />;
    case "EMAIL": return <Icon name="doc" className="w-4.5 h-4.5" />;
    default: return <Icon name="bell" className="w-4.5 h-4.5" />;
  }
}

const channelColor: Record<string, string> = {
  PUSH: "bg-[#E3F3EA] text-[#2D7A52]",
  SMS: "bg-[#E8EFFD] text-[#2F6FED]",
  EMAIL: "bg-[#FEF0E1] text-[#F97316]",
};

export function MemberNotificationsTemplate() {
  const { notifications, unreadCount, isLoading, markAsRead } = useNotifications(100);

  return (
    <div className="min-h-screen bg-[#F1F4F2] font-sans antialiased flex flex-col md:flex-row">
      <div className="hidden md:block"><MemberSidebar activePath="/notifications" /></div>
      <div className="flex-1 min-w-0 flex flex-col pb-20">

        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-[#E9EDEA] px-7 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-[19px] font-extrabold text-[#1B2321]">Notifications</h1>
            <p className="text-[12.5px] text-[#5B6B65] mt-0.5 font-medium">Your activity alerts and group updates</p>
          </div>
          {unreadCount > 0 && (
            <div className="flex items-center gap-2 bg-[#E3F3EA] text-[#2D7A52] text-[12px] font-bold px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#2D7A52] animate-pulse" />
              {unreadCount} unread
            </div>
          )}
        </header>

        <main className="p-4 md:p-7 flex flex-col gap-4">

          {isLoading && (
            <div className="py-16 flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-[#2D7A52] border-t-transparent rounded-full animate-spin" />
              <p className="text-[13px] text-[#5B6B65] font-medium">Loading notifications...</p>
            </div>
          )}

          {!isLoading && notifications.length === 0 && (
            <div className="py-20 flex flex-col items-center gap-3 text-center">
              <div className="w-14 h-14 rounded-full bg-[#E3F3EA] flex items-center justify-center">
                <Icon name="bell" className="w-6 h-6 text-[#2D7A52]" />
              </div>
              <h3 className="text-[15px] font-extrabold text-[#1B2321]">All caught up!</h3>
              <p className="text-[13px] text-[#5B6B65]">No notifications yet. We'll alert you when something important happens.</p>
            </div>
          )}

          {!isLoading && notifications.length > 0 && (
            <div className="bg-white rounded-[18px] shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA] overflow-hidden divide-y divide-[#F1F4F2]">
              {notifications.map((n: NotificationRecord) => (
                <div
                  key={n.id}
                  onClick={() => { if (!n.read) markAsRead(n.id); }}
                  className={`flex items-start gap-4 px-5 py-4 transition-colors cursor-pointer hover:bg-[#F7F9F8] ${!n.read ? "bg-[#F0F7F3]" : ""}`}
                >
                  <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 ${channelColor[n.channel] || "bg-[#E3F3EA] text-[#2D7A52]"}`}>
                    {channelIcon(n.channel)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13.5px] font-bold text-[#1B2321] truncate">{n.title}</span>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-[#2D7A52] shrink-0" />
                      )}
                    </div>
                    <p className="text-[12.5px] text-[#5B6B65] mt-0.5 line-clamp-2">{n.body}</p>
                    <span className="text-[11px] text-[#94A29C] mt-1 block">{timeAgo(n.createdAt)} · {n.channel}</span>
                  </div>
                  {!n.read && (
                    <button
                      onClick={(e) => { e.stopPropagation(); markAsRead(n.id); }}
                      className="text-[11px] font-bold text-[#2D7A52] hover:underline shrink-0 mt-1"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
