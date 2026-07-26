"use client";

import React, { useState } from "react";
import { Icon } from "@/components/atoms/Icon/Icon";
import { MemberSidebar } from "@/components/organisms/MemberSidebar/MemberSidebar";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
}

export const MemberAiAssistantTemplate: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "1", sender: "ai", text: "Muli bwanji! I am your VSLA AI Assistant. Ask me anything about your savings, loan rules, or financial advice in English or Chichewa.", time: "09:00 AM" },
    { id: "2", sender: "user", text: "How much loan am I eligible for this month?", time: "09:01 AM" },
    { id: "3", sender: "ai", text: "Based on your current savings of MWK 48,750 and 25 shares, you are eligible for up to 3x your savings (MWK 146,250) minus your current active loan balance.", time: "09:01 AM" },
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputVal,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputVal("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "I have recorded your request. Let me analyze your VSLA ledger and get back to you with exact figures!",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F1F4F2] font-sans antialiased flex flex-col md:flex-row">
      <div className="hidden md:block">
        <MemberSidebar />
      </div>

      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        <header className="bg-white/90 backdrop-blur-md border-b border-[#E9EDEA] px-7 py-4 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-[19px] font-extrabold text-[#1B2321]">VSLA AI Financial Assistant</h1>
            <p className="text-[12.5px] text-[#5B6B65] mt-0.5">Instant answers, savings guidance &amp; Chichewa translation</p>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col gap-3">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-[16px] p-4 text-[13.5px] ${m.sender === "user" ? "bg-[#2D7A52] text-white" : "bg-white text-[#1B2321] shadow-xs border border-[#E9EDEA]"}`}>
                <p>{m.text}</p>
                <div className={`text-[10px] mt-1.5 text-right ${m.sender === "user" ? "text-white/70" : "text-[#94A29C]"}`}>{m.time}</div>
              </div>
            </div>
          ))}
        </main>

        <footer className="bg-white border-t border-[#E9EDEA] p-4 flex items-center gap-3 shrink-0">
          <Input
            placeholder="Type a message or question..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            theme="green"
            fullWidth
          />
          <Button theme="green" onClick={handleSend} rightIcon={<Icon name="arrow-right" className="w-4 h-4" />}>
            Send
          </Button>
        </footer>
      </div>
    </div>
  );
};
