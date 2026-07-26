"use client";

import React from "react";
import { MemberSidebar } from "@/components/organisms/MemberSidebar/MemberSidebar";
import { Icon } from "@/components/atoms/Icon/Icon";
import Link from "next/link";

interface ProfileSubpageTemplateProps {
  title: string;
  children: React.ReactNode;
}

export const ProfileSubpageTemplate: React.FC<ProfileSubpageTemplateProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen font-sans antialiased flex flex-col md:flex-row bg-[#F1F4F2]">
      {/* ===== DESKTOP SIDEBAR ===== */}
      <div className="hidden md:block">
        <MemberSidebar activePath="/profile" />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 min-w-0 flex flex-col pb-12">
        {/* Desktop Header */}
        <header className="hidden md:flex bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-[#E9EDEA] px-7 py-4 items-center gap-4">
          <Link href="/profile" className="p-2 -ml-2 rounded-full hover:bg-[#F1F4F2] text-[#5B6B65] transition-colors">
            <Icon name="chevron-down" className="w-[18px] h-[18px] rotate-90" />
          </Link>
          <div>
            <h1 className="text-[19px] font-extrabold text-[#1B2321]">{title}</h1>
          </div>
        </header>

        {/* Mobile Header (Extended for overlap) */}
        <header className="md:hidden bg-gradient-to-b from-[#123A29] to-[#164A34] text-white px-5 pt-4 pb-16 relative">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/profile" className="p-1 -ml-1 active:scale-95 transition-transform">
              <Icon name="chevron-down" className="w-[20px] h-[20px] rotate-90" />
            </Link>
            <div className="text-[16px] font-extrabold">{title}</div>
          </div>
        </header>

        <main className="flex flex-col gap-5 max-w-4xl mx-auto w-full">
          {/* Profile Card (Overlapping on mobile, standard on desktop) */}
          <div className="mx-4 md:mx-7 -mt-12 md:mt-7 bg-white rounded-[20px] shadow-[0_4px_16px_rgba(18,58,41,0.08)] p-6 relative z-10 border border-[#EBEFED] flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="absolute top-4 right-4 bg-[#E3F3EA] text-[#1B5E3F] px-2.5 py-1 rounded-full text-[10.5px] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E3F] animate-ping" />
              Verified
            </div>
            
            <div className="w-[90px] h-[90px] rounded-full bg-gradient-to-tr from-[#123A29] to-[#2D7A52] text-white flex items-center justify-center text-[32px] font-extrabold shadow-[0_4px_12px_rgba(45,122,82,0.3)] border-4 border-white mt-2 md:mt-0 shrink-0">
              CB
            </div>

            <div className="text-center md:text-left mt-1 md:mt-0 flex-1">
              <h2 className="text-[20px] font-extrabold text-[#1B2321]">Chisomo Banda</h2>
              <p className="text-[12.5px] text-[#5B6B65] mt-0.5">Tikondane VSLA · Member</p>
              <p className="text-[12px] font-mono text-[#94A29C] mt-1.5 bg-[#F1F4F2] px-3 py-1 rounded-full inline-block md:inline-flex">ID: TVS-2025-001</p>
            </div>
          </div>

          <div className="px-4 md:px-7 flex flex-col gap-5 w-full pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
