"use client";
import React, { useState } from "react";
import { MemberSidebar } from "@/components/organisms/MemberSidebar/MemberSidebar";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";
import { Badge } from "@/components/atoms/Badge/Badge";

type MsgTheme = "green" | "blue" | "purple" | "orange" | "red" | "gray";

interface Message {
  id: string;
  sender: string;
  initials: string;
  theme: MsgTheme;
  text: string;
  time: string;
  unread?: boolean;
}

const conversations: Message[] = [
  { id: "1", sender: "Grace Banda (Secretary)", initials: "GB", theme: "purple", text: "Reminder: Our meeting is Sunday at 2:00 PM. Please bring contribution books.", time: "10:15 AM", unread: true },
  { id: "2", sender: "Kondwani Phiri (Treasurer)", initials: "KP", theme: "blue", text: "All loan repayment records for May have been reconciled.", time: "Yesterday" },
  { id: "3", sender: "Agnes Mwale (Chairperson)", initials: "AM", theme: "red", text: "Group vote needed on the withdrawal request from Grace.", time: "Mon" },
];

export const MemberMessagesTemplate: React.FC = () => {
  const [active, setActive] = useState<Message>(conversations[0]);
  const [inputMsg, setInputMsg] = useState("");
  const [chat, setChat] = useState([
    { id: "a", from: "them", text: conversations[0].text, time: conversations[0].time },
    { id: "b", from: "me", text: "Thanks for the reminder! I will be there.", time: "10:20 AM" },
  ]);

  const send = () => {
    if (!inputMsg.trim()) return;
    setChat(prev => [...prev, { id: Date.now().toString(), from: "me", text: inputMsg, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setInputMsg("");
  };

  return (
    <div className="min-h-screen bg-[#F1F4F2] font-sans antialiased flex flex-col md:flex-row">
      <div className="hidden md:block"><MemberSidebar activePath="/messages" /></div>
      <div className="flex-1 min-w-0 flex flex-col md:flex-row h-screen overflow-hidden">

        {/* Thread list */}
        <div className="w-full md:w-72 bg-white border-r border-[#E9EDEA] flex flex-col shrink-0">
          <div className="p-4 border-b border-[#E9EDEA]">
            <h2 className="text-[15px] font-extrabold text-[#1B2321]">Messages</h2>
            <p className="text-[11.5px] text-[#5B6B65] mt-0.5">Tikondane VSLA</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c)}
                className={`w-full text-left flex items-start gap-3 p-4 border-b border-[#F1F4F2] transition-colors ${active.id === c.id ? "bg-[#E3F3EA]" : "hover:bg-[#F7F9F8]"}`}
              >
                <Avatar initials={c.initials} theme={c.theme} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#1B2321] truncate">{c.sender}</span>
                    <span className="text-[10.5px] text-[#94A29C] ml-2 shrink-0">{c.time}</span>
                  </div>
                  <div className="text-[12px] text-[#5B6B65] mt-0.5 truncate">{c.text}</div>
                </div>
                {c.unread && <span className="w-2 h-2 rounded-full bg-[#2D7A52] mt-1.5 shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* Chat log */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#F1F4F2]">
          <header className="bg-white border-b border-[#E9EDEA] px-5 py-4 flex items-center gap-3 shrink-0">
            <Avatar initials={active.initials} theme={active.theme} size="sm" />
            <div>
              <div className="text-[14px] font-extrabold text-[#1B2321]">{active.sender}</div>
              <div className="flex items-center gap-1.5">
                <Badge variant="green" size="sm" dot>Online</Badge>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-5 flex flex-col gap-3">
            {chat.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[78%] rounded-[16px] px-4 py-3 text-[13.5px] ${msg.from === "me" ? "bg-[#2D7A52] text-white" : "bg-white text-[#1B2321] shadow-xs border border-[#E9EDEA]"}`}>
                  <p>{msg.text}</p>
                  <div className={`text-[10px] mt-1 text-right ${msg.from === "me" ? "text-white/70" : "text-[#94A29C]"}`}>{msg.time}</div>
                </div>
              </div>
            ))}
          </main>

          <footer className="bg-white border-t border-[#E9EDEA] p-4 flex items-center gap-3 shrink-0">
            <Input placeholder="Type a message..." value={inputMsg} onChange={e => setInputMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} theme="green" fullWidth />
            <Button theme="green" onClick={send}>Send</Button>
          </footer>
        </div>
      </div>
    </div>
  );
};
