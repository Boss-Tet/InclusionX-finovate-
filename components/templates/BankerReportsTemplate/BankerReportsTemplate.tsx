"use client";
import React, { useState } from "react";
import { BankerSidebar } from "@/components/organisms/BankerSidebar/BankerSidebar";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Button } from "@/components/atoms/Button/Button";
import { Badge } from "@/components/atoms/Badge/Badge";

const kpis = [
  { label: "Total Portfolio Value",  value: "MWK 32.8M",  delta: "+8.4% MoM",  color: "text-[#2F6FED] bg-[#E8EFFD]", icon: "wallet"           as const },
  { label: "Loan Disbursements",     value: "MWK 18.6M",  delta: "+6.7% MoM",  color: "text-[#16A34A] bg-[#E5F7EA]", icon: "hand-coin"        as const },
  { label: "Repayment Rate",         value: "91%",         delta: "Target: 90%",color: "text-[#16A34A] bg-[#E5F7EA]", icon: "trending-up"      as const },
  { label: "Active Groups",          value: "22/24",       delta: "2 flagged",  color: "text-[#F97316] bg-[#FEF0E1]", icon: "users"            as const },
];

export const BankerReportsTemplate: React.FC = () => {
  const [period, setPeriod] = useState("Q2 2025");

  return (
    <div className="min-h-screen bg-[#F2F4F8] font-sans antialiased flex flex-col md:flex-row">
      <div className="hidden md:block"><BankerSidebar activePath="/bank-officer/reports" /></div>
      <div className="flex-1 min-w-0 flex flex-col pb-12">

        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-[#EBEEF4] px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-[19px] font-extrabold text-[#182233]">Reports &amp; Analytics</h1>
            <p className="text-[12.5px] text-[#5C6B85] mt-0.5 font-medium">Financial health reports and portfolio analytics</p>
          </div>
          <div className="flex items-center gap-2">
            {["Q1 2025","Q2 2025","Q3 2025"].map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-bold border transition-all ${period === p ? "bg-[#2F6FED] text-white border-[#2F6FED]" : "bg-white text-[#5C6B85] border-[#EBEEF4] hover:border-[#2F6FED]/40"}`}>
                {p}
              </button>
            ))}
            <Button theme="blue" leftIcon={<Icon name="arrow-down-circle" className="w-4 h-4" />} size="sm">Export PDF</Button>
          </div>
        </header>

        <main className="p-4 md:p-6 flex flex-col gap-5">

          {/* KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((k, i) => (
              <div key={i} className="bg-white rounded-[16px] p-4.5 border border-[#EBEEF4] shadow-[0_2px_8px_rgba(11,30,58,0.04)]">
                <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center mb-3 ${k.color}`}>
                  <Icon name={k.icon} className="w-4.5 h-4.5" />
                </div>
                <div className="text-[20px] font-extrabold text-[#182233]">{k.value}</div>
                <div className="text-[11.5px] text-[#5C6B85] font-medium mt-0.5">{k.label}</div>
                <div className="mt-2 text-[11px] font-bold text-[#16A34A]">{k.delta}</div>
              </div>
            ))}
          </div>

          {/* Savings vs Loans chart */}
          <div className="bg-white rounded-[18px] p-5 shadow-[0_2px_10px_rgba(11,30,58,0.04)] border border-[#EBEEF4]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-extrabold text-[#182233]">Savings vs Loan Disbursements — {period}</h2>
            </div>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 700 200" className="w-full h-[200px] min-w-[500px]">
                <defs>
                  <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2F6FED" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#2F6FED" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="25"  x2="700" y2="25"  stroke="#EEF1F6" strokeWidth="1" />
                <line x1="0" y1="70"  x2="700" y2="70"  stroke="#EEF1F6" strokeWidth="1" />
                <line x1="0" y1="115" x2="700" y2="115" stroke="#EEF1F6" strokeWidth="1" />
                <line x1="0" y1="160" x2="700" y2="160" stroke="#EEF1F6" strokeWidth="1" />
                <polygon fill="url(#savingsGrad)" points="50,140 175,105 300,80 425,55 575,40 700,25 700,160 50,160" />
                <polyline fill="none" stroke="#2F6FED" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points="50,140 175,105 300,80 425,55 575,40 700,25" />
                <polyline fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="7 5" points="50,155 175,130 300,115 425,90 575,70 700,55" />
                {[["Apr", 50], ["May", 175], ["Jun", 300], ["Jul", 425], ["Aug", 575], ["Sep", 700]].map(([m, x]) => (
                  <text key={m} x={Number(x)} y="185" fontSize="10.5" fill="#9AA6BC" textAnchor="middle" fontFamily="Inter">{m}</text>
                ))}
              </svg>
            </div>
            <div className="flex gap-6 mt-2.5 justify-center">
              <span className="flex items-center gap-2 text-[11.5px] text-[#5C6B85] font-semibold"><span className="w-4 h-[3px] bg-[#2F6FED] rounded-full" />Total Savings</span>
              <span className="flex items-center gap-2 text-[11.5px] text-[#5C6B85] font-semibold"><span className="w-4 h-[3px] bg-[#16A34A] rounded-full" />Loans Disbursed</span>
            </div>
          </div>

          {/* Report cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Q2 Portfolio Summary",    updated: "30 Jun 2025",  type: "blue",   size: "2.3 MB" },
              { title: "Risk Assessment Report",  updated: "25 Jul 2026",  type: "red",    size: "1.1 MB" },
              { title: "Annual Health Score",     updated: "31 Dec 2024",  type: "purple", size: "4.8 MB" },
            ].map((r, i) => (
              <div key={i} className="bg-white rounded-[16px] p-4.5 border border-[#EBEEF4] shadow-[0_2px_8px_rgba(11,30,58,0.04)] flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[12px] bg-[#E8EFFD] text-[#2F6FED] flex items-center justify-center">
                    <Icon name="doc" className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-extrabold text-[#182233] leading-tight">{r.title}</div>
                    <div className="text-[11px] text-[#9AA6BC] mt-0.5">{r.updated} · {r.size}</div>
                  </div>
                </div>
                <Button variant="outline" theme="blue" size="sm" fullWidth leftIcon={<Icon name="arrow-down-circle" className="w-3.5 h-3.5" />}>
                  Download
                </Button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
