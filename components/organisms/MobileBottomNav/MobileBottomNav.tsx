"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/atoms/Icon/Icon";

export const MobileBottomNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Overlay & Menu Modal */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex items-end justify-center sm:items-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="relative bg-white w-full rounded-t-[24px] sm:rounded-[24px] sm:w-[320px] pb-24 pt-6 px-6 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-200">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[#EBEFED] rounded-full sm:hidden" />
            
            <h3 className="text-[17px] font-extrabold text-[#1B2321] mb-5">More Options</h3>
            
            <div className="grid grid-cols-4 gap-y-6 gap-x-2">
              <Link href="/my-group" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center gap-2 group">
                <div className="w-[46px] h-[46px] rounded-full bg-[#E6EEFA] text-[#4A7FC1] flex items-center justify-center group-active:scale-95 transition-transform">
                  <Icon name="users" className="w-[22px] h-[22px]" />
                </div>
                <span className="text-[11px] font-bold text-[#5B6B65] text-center leading-tight">My Group</span>
              </Link>

              <Link href="/contributions" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center gap-2 group">
                <div className="w-[46px] h-[46px] rounded-full bg-[#E3F3EA] text-[#2D7A52] flex items-center justify-center group-active:scale-95 transition-transform">
                  <Icon name="arrow-down-circle" className="w-[22px] h-[22px]" />
                </div>
                <span className="text-[11px] font-bold text-[#5B6B65] text-center leading-tight">Contributions</span>
              </Link>
              
              <Link href="/withdrawals" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center gap-2 group relative">
                <div className="w-[46px] h-[46px] rounded-full bg-[#FCEAE9] text-[#DC4B3F] flex items-center justify-center group-active:scale-95 transition-transform">
                  <Icon name="arrow-up-circle" className="w-[22px] h-[22px]" />
                </div>
                <span className="text-[11px] font-bold text-[#5B6B65] text-center leading-tight">Withdrawals</span>
                <span className="absolute -top-1 -right-1 bg-[#E8873A] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
              </Link>

              <Link href="/messages" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center gap-2 group relative">
                <div className="w-[46px] h-[46px] rounded-full bg-[#EFE9F9] text-[#8B6FC7] flex items-center justify-center group-active:scale-95 transition-transform">
                  <Icon name="chat" className="w-[22px] h-[22px]" />
                </div>
                <span className="text-[11px] font-bold text-[#5B6B65] text-center leading-tight">Messages</span>
                <span className="absolute -top-1 -right-1 bg-[#DC4B3F] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
              </Link>

              <Link href="/documents" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center gap-2 group">
                <div className="w-[46px] h-[46px] rounded-full bg-[#FCEADC] text-[#E8873A] flex items-center justify-center group-active:scale-95 transition-transform">
                  <Icon name="doc" className="w-[22px] h-[22px]" />
                </div>
                <span className="text-[11px] font-bold text-[#5B6B65] text-center leading-tight">Documents</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Nav Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#EBEFED] h-[82px] flex items-start justify-around pt-2.5 z-50 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors active:scale-90 text-[#94A29C]">
          <Icon name="grid" className="w-[21px] h-[21px]" /> Home
        </Link>
        <Link href="/savings-goal" className="flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors active:scale-90 text-[#94A29C]">
          <Icon name="layers" className="w-[21px] h-[21px]" /> Savings
        </Link>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`-mt-[30px] w-[54px] h-[54px] rounded-full text-white flex items-center justify-center shadow-[0_8px_20px_rgba(45,122,82,0.45)] border-4 border-white active:scale-90 transition-transform ${isMenuOpen ? "bg-[#1B2321] rotate-45 shadow-none" : "bg-gradient-to-tr from-[#123A29] to-[#2D7A52]"}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
        <Link href="/loans" className="flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors active:scale-90 text-[#94A29C]">
          <Icon name="wallet" className="w-[21px] h-[21px]" /> Loans
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors active:scale-90 text-[#94A29C]">
          <Icon name="user" className="w-[21px] h-[21px]" /> Profile
        </Link>
      </nav>
    </>
  );
};
