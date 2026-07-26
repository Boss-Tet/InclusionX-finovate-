import React from "react";
import { MemberChatTemplate } from "@/components/templates/MemberChatTemplate/MemberChatTemplate";

export const metadata = {
  title: "Group Chat | VSLA Connect",
  description: "Chat and announcements for VSLA group members",
};

export default function ChatPage() {
  return <MemberChatTemplate />;
}
