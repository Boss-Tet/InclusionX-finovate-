'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Minus, Loader2 } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const FloatingLandingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [position, setPosition] = useState({ x: 24, y: 24 }); // Offset from bottom right
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  
  const systemInstruction = `You are a helpful and welcoming AI assistant for 'VLSA Connect' (Village Savings and Loan Association).
Explain the system, what it's for, how to register, and the problems it aims to solve (digital transparency, avoiding paper ledgers, helping communities access formal loans through health scores, tamper-evident ledgers via USSD and Mobile Money).
Be concise, polite, and descriptive.`;

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { role: 'assistant', content: "Hello! I'm your VLSA Connect assistant. Want to know how we help communities digitize savings and unlock formal finance? Ask me anything!" }
      ]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle Dragging
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only allow drag on header, not buttons
    if ((e.target as HTMLElement).closest('.no-drag')) return;
    
    e.preventDefault();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX,
      y: e.clientY
    });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const dx = dragOffset.x - e.clientX;
    const dy = dragOffset.y - e.clientY;
    
    setDragOffset({ x: e.clientX, y: e.clientY });
    setPosition(prev => ({
      x: Math.max(0, prev.x + dx), // Prevent dragging completely off screen
      y: Math.max(0, prev.y + dy)
    }));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newHistory: ChatMessage[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: newHistory,
          systemInstruction
        })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages([...newHistory, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages([...newHistory, { role: 'assistant', content: 'Oops! I had trouble connecting. Please try again.' }]);
      }
    } catch (err) {
      setMessages([...newHistory, { role: 'assistant', content: 'Network error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isClosed) return null;

  return (
    <>
      {/* Floating Button (when closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl hover:scale-105 transition-transform"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatRef}
          className="fixed z-50 flex flex-col bg-white dark:bg-slate-900 shadow-2xl rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 sm:w-[380px] w-full h-[100dvh] sm:h-[550px] sm:bottom-auto sm:right-auto sm:top-auto sm:left-auto touch-none"
          style={{
            bottom: typeof window !== 'undefined' && window.innerWidth > 640 ? `${position.y}px` : '0',
            right: typeof window !== 'undefined' && window.innerWidth > 640 ? `${position.x}px` : '0',
            top: typeof window !== 'undefined' && window.innerWidth <= 640 ? '0' : 'auto',
            left: typeof window !== 'undefined' && window.innerWidth <= 640 ? '0' : 'auto',
            height: isMinimized ? 'auto' : undefined,
            transition: isDragging ? 'none' : 'height 0.2s ease-in-out'
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between px-4 py-3 bg-emerald-600 text-white cursor-grab active:cursor-grabbing select-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-semibold text-sm">VLSA Connect Guide</h3>
            </div>
            <div className="flex items-center gap-1 no-drag">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-emerald-500 rounded transition-colors hidden sm:block"
                title="Minimize"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
                className="p-1.5 hover:bg-emerald-500 rounded transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50 touch-auto">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.role === 'user' 
                          ? 'bg-emerald-600 text-white rounded-tr-sm' 
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-sm px-4 py-2.5 text-slate-500 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Thinking...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 no-drag">
                <form onSubmit={sendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about VLSA Connect..."
                    className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="p-2.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-colors shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
