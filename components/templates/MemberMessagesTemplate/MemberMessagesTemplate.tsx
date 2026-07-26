"use client";
import React, { useState } from "react";
import { MemberSidebar } from "@/components/organisms/MemberSidebar/MemberSidebar";
import { MobileBottomNav } from "@/components/organisms/MobileBottomNav/MobileBottomNav";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";

type MsgTheme = "green" | "blue" | "purple" | "orange" | "red" | "gray";

interface Message {
  id: string;
  sender: string;
  initials: string;
  theme: MsgTheme;
  text: string;
  time: string;
  from: "me" | "them";
}

const initialMessages: Message[] = [
  { id: "3", sender: "Agnes Mwale (Chairperson)", initials: "AM", theme: "red", text: "Group vote needed on the withdrawal request from Grace.", time: "Mon", from: "them" },
  { id: "2", sender: "Kondwani Phiri (Treasurer)", initials: "KP", theme: "blue", text: "All loan repayment records for May have been reconciled.", time: "Yesterday", from: "them" },
  { id: "1", sender: "Grace Banda (Secretary)", initials: "GB", theme: "purple", text: "Reminder: Our meeting is Sunday at 2:00 PM. Please bring contribution books.", time: "10:15 AM", from: "them" },
  { id: "a", sender: "Me", initials: "ME", theme: "green", text: "Thanks for the reminder! I will be there.", time: "10:20 AM", from: "me" },
];

export const MemberMessagesTemplate: React.FC = () => {
  const [chat, setChat] = useState<Message[]>(initialMessages);
  const [inputMsg, setInputMsg] = useState("");

  const send = () => {
    if (!inputMsg.trim()) return;
    setChat(prev => [...prev, { 
      id: Date.now().toString(), 
      sender: "Me",
      initials: "ME",
      theme: "green",
      from: "me", 
      text: inputMsg, 
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) 
    }]);
    setInputMsg("");
  };

  return (
    <div className="min-h-screen bg-[#F1F4F2] font-sans antialiased flex flex-col md:flex-row">
      <div className="hidden md:block">
        <MemberSidebar activePath="/messages" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden bg-[#F1F4F2]">
        
        {/* Chat Header */}
        <header className="bg-white border-b border-[#E9EDEA] px-4 md:px-7 py-3 md:py-4 flex items-center justify-between shrink-0 shadow-xs z-10">
          <div className="flex items-center gap-3">
            <div className="md:hidden w-[42px] h-[42px] rounded-full bg-gradient-to-tr from-[#123A29] to-[#2D7A52] text-white flex items-center justify-center font-extrabold text-[15px] shadow-xs">
              TV
            </div>
            <div>
              <div className="text-[17px] font-extrabold text-[#1B2321]">Tikondane VSLA</div>
              <div className="text-[12px] font-medium text-[#2D7A52] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5BE38A] animate-ping" />
                28 Members
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[#5B6B65]">
            <button className="hover:text-[#1B2321] transition-colors"><Icon name="search" className="w-5 h-5" /></button>
            <button className="hover:text-[#1B2321] transition-colors"><Icon name="users" className="w-5 h-5" /></button>
          </div>
        </header>

        {/* Chat Log */}
        <main className="flex-1 overflow-y-auto p-4 md:p-7 flex flex-col gap-4 pb-24 md:pb-20">
          <div className="flex justify-center my-2">
            <span className="bg-black/5 text-[#5B6B65] text-[10.5px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">This Week</span>
          </div>
          
          {chat.map((msg) => (
            <div key={msg.id} className={`flex gap-2 md:gap-3 ${msg.from === "me" ? "flex-row-reverse" : "flex-row"}`}>
              
              {/* Avatar (only for others) */}
              {msg.from === "them" && (
                <div className="shrink-0 mt-auto">
                  <Avatar initials={msg.initials} theme={msg.theme} size="sm" />
                </div>
              )}

              {/* Message Bubble */}
              <div className={`flex flex-col ${msg.from === "me" ? "items-end" : "items-start"} max-w-[85%] md:max-w-[70%]`}>
                
                {/* Sender Name (only for others) */}
                {msg.from === "them" && (
                  <span className="text-[11.5px] font-bold text-[#5B6B65] mb-1 ml-1">{msg.sender}</span>
                )}

                <div className={`rounded-[18px] px-4 py-3 text-[14.5px] shadow-sm leading-relaxed ${
                  msg.from === "me" 
                    ? "bg-[#123A29] text-white rounded-br-[4px]" 
                    : "bg-white text-[#1B2321] border border-[#E9EDEA] rounded-bl-[4px]"
                }`}>
                  <p>{msg.text}</p>
                </div>
                
                <span className={`text-[10px] font-semibold mt-1 ${msg.from === "me" ? "mr-1 text-[#94A29C]" : "ml-1 text-[#94A29C]"}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </main>

        {/* WhatsApp-Style Input Footer */}
        <footer className="bg-[#F1F4F2] p-2 md:p-3 flex items-end gap-2 shrink-0 z-10 relative mb-[82px] md:mb-0">
          
          <div className="flex-1 bg-white rounded-[22px] min-h-[44px] flex items-end px-2 py-1 shadow-sm border border-[#E9EDEA] transition-all">
            <button className="w-9 h-9 mb-0.5 rounded-full flex items-center justify-center text-[#94A29C] hover:text-[#5B6B65] shrink-0 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            </button>
            
            <textarea 
              rows={1}
              placeholder="Type a message..." 
              value={inputMsg} 
              onChange={e => {
                setInputMsg(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }} 
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                  e.currentTarget.style.height = 'auto';
                }
              }}
              className="flex-1 bg-transparent border-none py-2 px-2 mx-1 text-[15px] text-[#1B2321] placeholder-[#94A29C] focus:outline-none focus:ring-0 resize-none max-h-[120px]" 
              style={{ minHeight: '36px' }}
            />
            
            <div className="flex items-center gap-1 shrink-0 pr-1 mb-0.5">
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-[#94A29C] hover:text-[#5B6B65] transition-colors relative overflow-hidden">
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*,.pdf,.doc,.docx" />
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              </button>
              {!inputMsg.trim() && (
                <button className="w-9 h-9 rounded-full flex items-center justify-center text-[#94A29C] hover:text-[#5B6B65] transition-colors relative overflow-hidden">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" capture="environment" />
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                </button>
              )}
            </div>
          </div>

          <button 
            onClick={() => {
              send();
              // Reset textarea height hack for the button click
              const ta = document.querySelector('textarea');
              if (ta) ta.style.height = 'auto';
            }}
            className="w-[46px] h-[46px] rounded-full bg-[#2D7A52] text-white flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-transform mb-0.5"
          >
            {inputMsg.trim() ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
            )}
          </button>
        </footer>
      </div>

      <MobileBottomNav />
    </div>
  );
};
