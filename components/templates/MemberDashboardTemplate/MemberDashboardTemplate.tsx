"use client";

import { MobileBottomNav } from "@/components/organisms/MobileBottomNav/MobileBottomNav";
import React, { useState } from "react";
import { Icon } from "@/components/atoms/Icon/Icon";
import { MemberSidebar } from "@/components/organisms/MemberSidebar/MemberSidebar";
import { StatCard } from "@/components/molecules/StatCard/StatCard";
import { ContributionChart } from "@/components/organisms/ContributionChart/ContributionChart";
import { TransactionRow } from "@/components/molecules/TransactionRow/TransactionRow";
import { PendingActionCard } from "@/components/molecules/PendingActionCard/PendingActionCard";
import { QuickInfoTile } from "@/components/molecules/QuickInfoTile/QuickInfoTile";
import { NextMeetingCard } from "@/components/organisms/NextMeetingCard/NextMeetingCard";

type MobileTab = "home" | "savings" | "add" | "loans" | "profile";

export const MemberDashboardTemplate: React.FC = () => {
  const [mobileTab, setMobileTab] = useState<MobileTab>("home");
  const [showBalance, setShowBalance] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-[#F1F4F2] font-sans antialiased flex flex-col md:flex-row">
      {/* ===== DESKTOP SIDEBAR ===== */}
      <div className="hidden md:block">
        <MemberSidebar />
      </div>

      {/* ===== MAIN COLUMN ===== */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* ────── DESKTOP TOPBAR ────── */}
        <header className="hidden md:flex bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-[#E9EDEA] px-7 py-4 items-center justify-between shadow-xs">
          <div>
            <h1 className="text-[19px] font-extrabold text-[#1B2321] tracking-tight">Welcome back, Chisomo 👋</h1>
            <p className="text-[12.5px] text-[#5B6B65] mt-0.5 font-medium">Here&apos;s what&apos;s happening in your group today.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[#5B6B65] border border-[#E9EDEA] bg-white rounded-[10px] px-3 py-1.5 cursor-pointer hover:border-[#2D7A52]/40 transition-colors">
              EN <Icon name="chevron-down" className="w-3 h-3" />
            </span>
            <div className="relative text-[#5B6B65] cursor-pointer hover:text-[#1B2321] transition-colors p-1">
              <Icon name="bell" className="w-5 h-5" />
              <span className="absolute top-0 right-0 bg-[#DC4B3F] text-white text-[9.5px] font-bold w-[15px] h-[15px] rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                2
              </span>
            </div>
            <div className="flex items-center gap-2.5 pl-3 border-l border-[#E9EDEA]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#123A29] to-[#2D7A52] text-white flex items-center justify-center font-extrabold text-[12.5px] shadow-xs">
                CB
              </div>
              <div>
                <div className="text-[13px] font-bold text-[#1B2321]">Chisomo Banda</div>
                <div className="text-[11px] text-[#94A29C] font-semibold">Member</div>
              </div>
            </div>
          </div>
        </header>

        {/* ────── DESKTOP CONTENT ────── */}
        <main className="hidden md:flex flex-col gap-5 p-7 pb-12">
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard variant="member" icon="wallet" iconBgColor="blue" value={showBalance ? "MWK 48,750" : "••••••••"} label="My Savings Balance" linkText="View details" />
            <StatCard variant="member" icon="users" iconBgColor="green" value={showBalance ? "MWK 1,245,500" : "••••••••"} label="Group Total Savings" linkText="View group" />
            <StatCard variant="member" icon="arrow-down-circle" iconBgColor="blue" value="MWK 245,000" label="Total Contributions (This Month)" linkText="View history" />
            <StatCard variant="member" icon="layers" iconBgColor="purple" value="25 Shares" label="My Shares" linkText="View details" />
          </div>

          {/* Contribution chart */}
          <ContributionChart />

          {/* Two column: Recent transactions + Upcoming */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-4">
            <div className="bg-white rounded-[18px] p-5.5 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[15px] font-extrabold text-[#1B2321]">Recent Transactions</span>
                <button className="text-[12.5px] font-bold text-[#2D7A52] hover:text-[#1B5E3F] transition-colors">View all</button>
              </div>
              <TransactionRow icon="arrow-down-circle" iconBgColor="green" title="Contribution" subtitle="Monthly contribution · May 25, 2025 · 09:15 AM" amount="+ MWK 25,000" isPositive={true} />
              <TransactionRow icon="wallet" iconBgColor="blue" title="Loan Repayment" subtitle="Loan #LN-2025-001 · May 20, 2025 · 10:30 AM" amount="- MWK 40,000" isPositive={false} />
              <TransactionRow icon="arrow-up-circle" iconBgColor="red" title="Withdrawal" subtitle="School fees · May 18, 2025 · 02:45 PM" amount="- MWK 15,000" isPositive={false} />
              <TransactionRow icon="star" iconBgColor="gold" title="Bonus" subtitle="End of month bonus · May 15, 2025 · 11:20 AM" amount="+ MWK 3,750" isPositive={true} />
            </div>

            <div className="bg-white rounded-[18px] p-5.5 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[15px] font-extrabold text-[#1B2321]">Upcoming &amp; Pending</span>
              </div>
              <PendingActionCard variant="orange" icon="arrow-up-circle" title="Withdrawal Vote" subtitle="School building fund · Requested by: Grace M." amount="Amount: MWK 120,000" badgeText="Pending" actionText="Vote Now" />
              <PendingActionCard variant="blue" icon="doc" title="Loan Request" subtitle="Business capital · Requested by: Kondwani B." amount="Amount: MWK 200,000" badgeText="Pending" actionText="Review" />
            </div>
          </div>

          {/* Group quick info + next meeting */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 bg-white rounded-[18px] p-5.5 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
              <QuickInfoTile icon="tag" label="Group Name" value="Tikondane VSLA" />
              <QuickInfoTile icon="hash" label="Group Code" value="TVS-2025-001" />
              <QuickInfoTile icon="calendar" label="Meeting Day" value="Every Sunday" />
              <QuickInfoTile icon="vote" label="Group Type" value="Chilimba" />
              <QuickInfoTile icon="users" label="Members" value="25 Members" />
            </div>
            <div className="w-full lg:w-[300px] shrink-0">
              <NextMeetingCard date="Sunday, 1 June 2025 · 2:00 PM" />
            </div>
          </div>
        </main>

        {/* ═══════════════════════════════════════════════
            MOBILE VIEW — enriched with interactive balance toggle & micro-animations
            ═══════════════════════════════════════════════ */}
        <div className="md:hidden flex flex-col flex-1 bg-[#F3F5F4] pb-[85px]">

          {/* App header */}
          <header className="bg-gradient-to-b from-[#123A29] to-[#164A34] text-white px-5 pt-3.5 pb-14 relative">
            <div className="flex items-center justify-between mb-[18px]">
              <button className="p-1 -ml-1 active:scale-95 transition-transform">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="text-center">
                <div className="text-[16px] font-extrabold tracking-[0.3px]">VSLA CONNECT</div>
                <div className="text-[10.5px] text-[#B9D4C6] mt-0.5 font-medium">Growing Together, Building Futures</div>
              </div>
              <div className="relative cursor-pointer p-1 -mr-1">
                <Icon name="bell" className="w-[22px] h-[22px]" />
                <span className="absolute -top-1 -right-1 bg-[#DC4B3F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#123A29] animate-pulse">3</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-[52px] h-[52px] rounded-full bg-white/12 border border-white/35 flex items-center justify-center shrink-0 backdrop-blur-xs">
                <Icon name="users" className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[17px] font-bold">Chilimba Thanzi Group</div>
                <div className="flex items-center gap-1.5 text-[12.5px] text-[#C9E0D4] mt-0.5 font-medium">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21s7-7.4 7-12a7 7 0 10-14 0c0 4.6 7 12 7 12z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  Blantyre, Malawi
                </div>
                <div className="flex items-center gap-2 mt-2 text-[12px] text-[#DCEDE4]">
                  <span className="flex items-center gap-1.5 bg-white/14 rounded-full px-2.5 py-0.5 font-semibold text-white backdrop-blur-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5BE38A] animate-ping" />
                    Active
                  </span>
                  <span>• 28 Members</span>
                </div>
              </div>
              <span className="text-[#B9D4C6] shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </header>

          {/* Balance card */}
          <div className="mx-4 -mt-[42px] bg-white rounded-[20px] shadow-[0_4px_16px_rgba(18,58,41,0.08)] p-[18px] relative z-10 border border-[#EBEFED]">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="flex items-center gap-1.5 text-[12.5px] text-[#5B6B65] font-semibold hover:text-[#1B2321] transition-colors cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" />
                </svg>
                Group Savings Balance
              </button>
              <span className="flex items-center gap-1 bg-[#E3F3EA] text-[#1B5E3F] text-[11.5px] font-bold px-2.5 py-1 rounded-full">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" />
                </svg>
                +12.5%
              </span>
            </div>

            <div className="text-[29px] font-extrabold mt-2 mb-0.5 tracking-[-0.3px] text-[#1B2321]">
              {showBalance ? "MWK 1,250,000" : "••••••••••••"}
            </div>
            <div className="text-[12px] text-[#94A29C] font-medium">Total Savings <span className="text-[#94A29C]">· vs last month</span></div>

            <div className="h-px bg-[#EBEFED] my-3.5" />

            <div className="flex">
              <div className="flex-1 text-center">
                <div className="w-[38px] h-[38px] rounded-full bg-[#E3F3EA] text-[#2D7A52] flex items-center justify-center mx-auto mb-2 shadow-xs">
                  <Icon name="arrow-down-circle" className="w-[18px] h-[18px]" />
                </div>
                <div className="text-[11px] text-[#5B6B65] font-medium mb-0.5">My Total Contributions</div>
                <div className="text-[14px] font-bold text-[#2D7A52]">
                  {showBalance ? "MWK 85,000" : "••••••"}
                </div>
              </div>
              <div className="flex-1 text-center border-l border-[#EBEFED]">
                <div className="w-[38px] h-[38px] rounded-full bg-[#E6EEFA] text-[#4A7FC1] flex items-center justify-center mx-auto mb-2 shadow-xs">
                  <Icon name="wallet" className="w-[18px] h-[18px]" />
                </div>
                <div className="text-[11px] text-[#5B6B65] font-medium mb-0.5">My Loan Balance</div>
                <div className="text-[14px] font-bold text-[#4A7FC1]">
                  {showBalance ? "MWK 120,000" : "••••••"}
                </div>
              </div>
              <div className="flex-1 text-center border-l border-[#EBEFED]">
                <div className="w-[38px] h-[38px] rounded-full bg-[#FCEADC] text-[#E8873A] flex items-center justify-center mx-auto mb-2 shadow-xs">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.6 2.9-6.4 6.5-6.4" /><circle cx="17" cy="16" r="4.2" /><path d="M17 14v2l1.4 1" />
                  </svg>
                </div>
                <div className="text-[11px] text-[#5B6B65] font-medium mb-0.5">Next Contribution</div>
                <div className="text-[14px] font-bold text-[#E8873A]">MWK 5,000</div>
                <div className="text-[10.5px] text-[#94A29C] mt-0.5 font-medium">Due in 5 days</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mx-4 mt-3.5 bg-white rounded-[20px] shadow-[0_2px_10px_rgba(18,58,41,0.06)] p-4 border border-[#EBEFED]">
            <div className="text-[14.5px] font-bold text-[#1B2321] mb-3.5">Quick Actions</div>
            <div className="flex justify-between">
              {[
                { icon: "arrow-down-circle" as const, label: "Make\nContribution", bg: "bg-[#E3F3EA]", color: "text-[#2D7A52]" },
                { icon: "arrow-up-circle" as const, label: "Request\nLoan", bg: "bg-[#E6EEFA]", color: "text-[#4A7FC1]" },
                { icon: "vote" as const, label: "Vote &\nApprovals", bg: "bg-[#EFE9F9]", color: "text-[#8B6FC7]" },
                { icon: "doc" as const, label: "Group\nDocuments", bg: "bg-[#FCEADC]", color: "text-[#E8873A]" },
                { icon: "chat" as const, label: "Chat", bg: "bg-[#E3F3EA]", color: "text-[#2D7A52]" },
              ].map((qa) => (
                <button key={qa.label} className="flex flex-col items-center gap-1.5 w-[19%] active:scale-95 transition-transform cursor-pointer">
                  <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${qa.bg} ${qa.color} shadow-xs`}>
                    <Icon name={qa.icon} className="w-5 h-5" />
                  </div>
                  <span className="text-[10.5px] font-semibold text-[#5B6B65] text-center leading-[1.2] whitespace-pre-line">{qa.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mx-4 mt-3.5 bg-white rounded-[20px] shadow-[0_2px_10px_rgba(18,58,41,0.06)] p-4 pb-3.5 border border-[#EBEFED]">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-[14.5px] font-bold text-[#1B2321]">Recent Activity</span>
              <button className="text-[12.5px] font-semibold text-[#2D7A52] hover:underline">View all</button>
            </div>
            <div className="flex items-center gap-3 py-2.5 border-b border-[#EBEFED]">
              <div className="w-[38px] h-[38px] rounded-full bg-[#E3F3EA] text-[#2D7A52] flex items-center justify-center shrink-0">
                <Icon name="arrow-down-circle" className="w-[17px] h-[17px]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-[#1B2321]">You contributed MWK 5,000</div>
                <div className="text-[11.5px] text-[#94A29C] mt-0.5">Today, 08:45 AM</div>
              </div>
              <div className="text-[13px] font-bold text-[#2D7A52] whitespace-nowrap">+5,000</div>
            </div>

            <div className="flex items-center gap-3 py-2.5 border-b border-[#EBEFED]">
              <div className="w-[38px] h-[38px] rounded-full bg-[#FCEADC] text-[#E8873A] flex items-center justify-center shrink-0">
                <Icon name="user" className="w-[17px] h-[17px]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-[#1B2321]">Loan disbursed to Grace Banda</div>
                <div className="text-[11.5px] text-[#94A29C] mt-0.5">Yesterday, 02:30 PM</div>
              </div>
              <div className="text-[13px] font-bold text-[#1B2321] whitespace-nowrap">-50,000</div>
            </div>

            <div className="flex items-center gap-3 py-2.5 border-b border-[#EBEFED]">
              <div className="w-[38px] h-[38px] rounded-full bg-[#EFE9F9] text-[#8B6FC7] flex items-center justify-center shrink-0">
                <Icon name="users" className="w-[17px] h-[17px]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-[#1B2321]">Vote: Loan request by John Phiri</div>
                <div className="text-[11.5px] text-[#94A29C] mt-0.5">21 Jul 2026, 09:10 AM</div>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#E3F3EA] text-[#1B5E3F] whitespace-nowrap">Approved</span>
            </div>

            <div className="flex items-center gap-3 py-2.5">
              <div className="w-[38px] h-[38px] rounded-full bg-[#E6EEFA] text-[#4A7FC1] flex items-center justify-center shrink-0">
                <Icon name="doc" className="w-[17px] h-[17px]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-[#1B2321]">Meeting minutes uploaded</div>
                <div className="text-[11.5px] text-[#94A29C] mt-0.5">20 Jul 2026, 04:15 PM</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B9D4C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mx-4 mt-3.5 bg-white rounded-[20px] shadow-[0_2px_10px_rgba(18,58,41,0.06)] p-4 pb-3.5 border border-[#EBEFED]">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-[14.5px] font-bold text-[#1B2321]">Upcoming Events</span>
              <button className="text-[12.5px] font-semibold text-[#2D7A52] hover:underline">View all</button>
            </div>
            <div className="flex items-center gap-3 bg-[#E3F3EA] rounded-[14px] p-3 border border-[#2D7A52]/10">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-[#2D7A52] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Icon name="calendar" className="w-[18px] h-[18px]" />
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-[#1B2321]">Monthly Meeting</div>
                <div className="text-[11.5px] text-[#5B6B65] mt-0.5">27 July 2026 · 2:00 PM</div>
              </div>
              <div className="text-[12px] font-bold text-[#1B5E3F] whitespace-nowrap">In 3 days</div>
            </div>
          </div>
        </div>

      </div>

      <MobileBottomNav />

    </div>
  );
};
