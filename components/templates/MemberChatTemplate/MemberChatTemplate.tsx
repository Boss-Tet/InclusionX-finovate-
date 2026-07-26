"use client";

import React, { useState } from "react";
import { Icon } from "@/components/atoms/Icon/Icon";
import { MemberSidebar } from "@/components/organisms/MemberSidebar/MemberSidebar";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";
import { Avatar } from "@/components/atoms/Avatar/Avatar";

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  initials: string;
  theme: "green" | "blue" | "purple" | "orange" | "red" | "gray";
}

export const MemberChatTemplate: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState("Group Announcements");
  const [inputMsg, setInputMsg] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "1", sender: "Grace Banda (Secretary)", text: "Reminder: Our next meeting is on Sunday at 2:00 PM. Please make sure to bring your contribution books.", time: "10:15 AM", initials: "GB", theme: "purple" as const },
    { id: "2", sender: "Kondwani Phiri (Treasurer)", text: "All loan repayment records for May have been reconciled.", time: "11:30 AM", initials: "KP", theme: "blue" as const },
  ]);

  const handleSend = () => {
    if (!inputMsg.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "Chisomo Banda (Me)",
        text: inputMsg,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        initials: "CB",
        theme: "green" as const,
      },
    ]);
    setInputMsg("");
  };

  return (
    <div className="min-h-screen bg-[#F1F4F2] font-sans antialiased flex flex-col md:flex-row">
      <div className="hidden md:block">
        <MemberSidebar />
      </div>

      <div className="flex-1 min-w-0 flex flex-col md:flex-row h-screen overflow-hidden">
        {/* Chat channels sidebar */}
        <div className="w-full md:w-64 bg-white border-r border-[#E9EDEA] flex flex-col shrink-0">
          <div className="p-4 border-b border-[#E9EDEA]">
            <h2 className="text-[15px] font-extrabold text-[#1B2321]">Group Chat</h2>
            <p className="text-[11.5px] text-[#5B6B65]">Tikondane VSLA Channels</p>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {["Group Announcements", "General Discussions", "Loan Committee"].map((c) => (
              <button
                key={c}
                onClick={() => setActiveChannel(c)}
                className={`w-full text-left p-3 rounded-[10px] text-[13px] font-bold mb-1 transition-colors ${activeChannel === c ? "bg-[#E3F3EA] text-[#2D7A52]" : "text-[#5B6B65] hover:bg-[#F1F4F2]"}`}
              >
                # {c}
              </button>
            ))}
          </div>
        </div>

        {/* Chat main log */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#F1F4F2]">
          <header className="bg-white border-b border-[#E9EDEA] px-6 py-4 flex items-center justify-between shrink-0">
            <h1 className="text-[16px] font-extrabold text-[#1B2321]"># {activeChannel}</h1>
            <span className="text-[12px] text-[#94A29C]">25 Members</span>
          </header>

          <main className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col gap-4">
            {messages.map((m) => (
              <div key={m.id} className="flex items-start gap-3 bg-white p-4 rounded-[16px] shadow-xs border border-[#E9EDEA]">
                <Avatar initials={m.initials} theme={m.theme} size="md" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#1B2321]">{m.sender}</span>
                    <span className="text-[10.5px] text-[#94A29C]">{m.time}</span>
                  </div>
                  <p className="text-[13px] text-[#5B6B65] mt-1">{m.text}</p>
                </div>
              </div>
            ))}
          </main>

          <footer className="bg-white border-t border-[#E9EDEA] p-4 flex items-center gap-3 shrink-0">
            <Input
              placeholder={`Message #${activeChannel}...`}
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              theme="green"
              fullWidth
            />
            <Button theme="green" onClick={handleSend}>Send</Button>
          </footer>
        </div>
      </div>
    </div>
  );
};
