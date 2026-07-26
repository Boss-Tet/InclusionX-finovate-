'use client';

import React from "react";
import { MemberChatTemplate } from "@/components/templates/MemberChatTemplate/MemberChatTemplate";
import { useProfile } from "@/hooks/useProfile";
import { useChat } from "@/hooks/useChat";
import { setActiveGroupId } from "@/lib/api/client";

function getStoredGroupId(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("vsla_active_group_id") ?? "";
}

export default function MemberChatPage() {
  const groupId = getStoredGroupId();
  if (groupId) setActiveGroupId(groupId);

  const { profile } = useProfile();
  const { messages, isSending, sendMessage } = useChat(groupId);

  return (
    <MemberChatTemplate
      messages={messages}
      isSending={isSending}
      currentUserId={profile?.userId ?? ""}
      currentUserName={profile?.fullName ?? "You"}
      onSendMessage={sendMessage}
    />
  );
}
