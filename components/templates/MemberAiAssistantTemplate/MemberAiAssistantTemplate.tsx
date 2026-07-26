"use client";

import React, { useState, useRef, useEffect } from "react";
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

const SYSTEM_INSTRUCTION = `You are a helpful VSLA (Village Savings and Loan Association) financial assistant for members in Malawi. 
Your role is to:
- Answer questions about savings, loans, and VSLA rules in simple, clear language
- Provide financial guidance relevant to rural Malawi communities
- Support both English and Chichewa (you can respond in the language the user writes in)
- Help members understand their loan eligibility (typically 3x their savings/shares)
- Explain meeting procedures, fines, and group governance
- Be warm, encouraging, and culturally appropriate
Keep responses concise, practical, and actionable.`;

export const MemberAiAssistantTemplate: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "1", sender: "ai", text: "Muli bwanji! I am your VSLA AI Assistant. Ask me anything about your savings, loan rules, or financial advice in English or Chichewa.", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const handleSend = async () => {
    if (!inputVal.trim() || isThinking) return;
    const userText = inputVal.trim();
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: ChatMessage = { id: Date.now().toString(), sender: "user", text: userText, time: now };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsThinking(true);

    try {
      // Build conversation history for the AI (exclude the opening greeting from history)
      const updatedMessages = [...messages, userMsg];
      const history = updatedMessages.slice(1).map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history, systemInstruction: SYSTEM_INSTRUCTION }),
      });

      const data = await res.json();
      const replyText = data.reply || "I'm sorry, I couldn't process your request right now. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "Sorry, I'm having trouble connecting right now. Please check your connection and try again.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsThinking(false);
    }
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
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isThinking ? "bg-[#F97316] animate-pulse" : "bg-[#2D7A52]"}`} />
            <span className="text-[11.5px] font-semibold text-[#5B6B65]">{isThinking ? "Thinking..." : "Online"}</span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col gap-3">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
              {m.sender === "ai" && (
                <div className="w-8 h-8 rounded-full bg-[#2D7A52] flex items-center justify-center shrink-0 mr-2 mt-0.5">
                  <Icon name="sparkle" className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-[16px] p-4 text-[13.5px] ${m.sender === "user" ? "bg-[#2D7A52] text-white" : "bg-white text-[#1B2321] shadow-xs border border-[#E9EDEA]"}`}>
                <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                <div className={`text-[10px] mt-1.5 text-right ${m.sender === "user" ? "text-white/70" : "text-[#94A29C]"}`}>{m.time}</div>
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-[#2D7A52] flex items-center justify-center shrink-0 mr-2 mt-0.5">
                <Icon name="sparkle" className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white rounded-[16px] p-4 border border-[#E9EDEA] shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#2D7A52] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-[#2D7A52] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-[#2D7A52] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </main>

        <footer className="bg-white border-t border-[#E9EDEA] p-4 flex items-center gap-3 shrink-0">
          <Input
            placeholder="Ask about your savings, loans, or anything VSLA..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            theme="green"
            fullWidth
          />
          <Button theme="green" onClick={handleSend} disabled={isThinking || !inputVal.trim()} rightIcon={<Icon name="arrow-right" className="w-4 h-4" />}>
            Send
          </Button>
        </footer>
      </div>
    </div>
  );
};

