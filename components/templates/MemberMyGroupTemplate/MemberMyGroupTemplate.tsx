"use client";
import React from "react";
import { MemberSidebar } from "@/components/organisms/MemberSidebar/MemberSidebar";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { QuickInfoTile } from "@/components/molecules/QuickInfoTile/QuickInfoTile";
import { NextMeetingCard } from "@/components/organisms/NextMeetingCard/NextMeetingCard";

const members = [
  { initials: "CB", name: "Chisomo Banda",   role: "Member",    shares: 25, status: "Active", theme: "green"  as const },
  { initials: "GB", name: "Grace Banda",     role: "Secretary", shares: 30, status: "Active", theme: "purple" as const },
  { initials: "KP", name: "Kondwani Phiri",  role: "Treasurer", shares: 28, status: "Active", theme: "blue"   as const },
  { initials: "JP", name: "John Phiri",      role: "Member",    shares: 20, status: "Active", theme: "orange" as const },
  { initials: "AM", name: "Agnes Mwale",     role: "Chairperson",shares: 35,status: "Active", theme: "red"    as const },
  { initials: "TN", name: "Thandiwe Njaya",  role: "Member",    shares: 18, status: "Active", theme: "gray"   as const },
];

export const MemberMyGroupTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F1F4F2] font-sans antialiased flex flex-col md:flex-row">
      <div className="hidden md:block"><MemberSidebar activePath="/my-group" /></div>
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Sticky header */}
        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-[#E9EDEA] px-7 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-[19px] font-extrabold text-[#1B2321]">My Group</h1>
            <p className="text-[12.5px] text-[#5B6B65] mt-0.5">Tikondane VSLA · TVS-2025-001</p>
          </div>
          <Badge variant="green" dot>Active Group</Badge>
        </header>

        {/* Scrollable main */}
        <main className="flex-1 overflow-y-auto p-4 md:p-7 flex flex-col gap-5 pb-12">

          {/* Group banner */}
          <div className="bg-gradient-to-r from-[#123A29] to-[#2D7A52] rounded-[18px] p-6 text-white flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-white/18 border border-white/40 flex items-center justify-center font-extrabold text-[20px] shrink-0">TG</div>
            <div className="flex-1">
              <div className="text-[20px] font-extrabold">Tikondane VSLA</div>
              <div className="text-[12.5px] text-[#B9D4C6] mt-0.5">Blantyre, Malawi · Est. January 2024</div>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="bg-white/18 backdrop-blur-xs text-white text-[11.5px] font-bold px-3 py-1 rounded-full">Chilimba Model</span>
                <span className="bg-white/18 backdrop-blur-xs text-white text-[11.5px] font-bold px-3 py-1 rounded-full">25 Members</span>
                <span className="bg-white/18 backdrop-blur-xs text-white text-[11.5px] font-bold px-3 py-1 rounded-full">Every Sunday</span>
              </div>
            </div>
            <Button variant="outline" theme="green" className="border-white/50 text-white hover:bg-white/20 hover:border-white/70">
              Invite Member
            </Button>
          </div>

          {/* Quick info grid */}
          <div className="bg-white rounded-[18px] p-5 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto">
            <QuickInfoTile icon="tag"      label="Group Name"    value="Tikondane VSLA" />
            <QuickInfoTile icon="hash"     label="Group Code"    value="TVS-2025-001" />
            <QuickInfoTile icon="calendar" label="Meeting Day"   value="Every Sunday" />
            <QuickInfoTile icon="vote"     label="Group Type"    value="Chilimba" />
            <QuickInfoTile icon="users"    label="Members"       value="25 Members" />
            <QuickInfoTile icon="goal"     label="Cycle"         value="Jan–Dec 2025" />
          </div>

          {/* Members table */}
          <div className="bg-white rounded-[18px] shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E9EDEA]">
              <h2 className="text-[15px] font-extrabold text-[#1B2321]">Group Members</h2>
              <span className="text-[12px] text-[#94A29C] font-semibold">25 total</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-[#F7F9F8] text-[11.5px] font-bold text-[#94A29C] text-left">
                    <th className="px-5 py-3">Member</th>
                    <th className="px-5 py-3">Role</th>
                    <th className="px-5 py-3">Shares</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m, i) => (
                    <tr key={i} className="border-t border-[#F1F4F2] hover:bg-[#F7F9F8] transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <Avatar initials={m.initials} theme={m.theme} size="sm" />
                          <span className="font-semibold text-[#1B2321]">{m.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-[#5B6B65] font-medium">{m.role}</td>
                      <td className="px-5 py-3.5 font-bold text-[#2D7A52]">{m.shares}</td>
                      <td className="px-5 py-3.5">
                        <Badge variant="green" size="sm" dot>Active</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Next meeting */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
            <div className="bg-white rounded-[18px] p-5 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA]">
              <h3 className="text-[15px] font-extrabold text-[#1B2321] mb-4">Group Rules & By-Laws</h3>
              {["Monthly contribution: MWK 5,000 per member", "Loan interest: 10% per month, max 3× savings", "Meeting quorum: 60% of members required", "Penalties for late contribution: MWK 500/week", "Withdrawal requires group vote (simple majority)"].map((rule, i) => (
                <div key={i} className="flex items-start gap-2.5 py-2.5 border-b border-[#F1F4F2] last:border-0">
                  <span className="w-5 h-5 rounded-full bg-[#E3F3EA] text-[#2D7A52] flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-[13px] text-[#5B6B65] font-medium">{rule}</span>
                </div>
              ))}
            </div>
            <NextMeetingCard date="Sunday, 1 June 2025 · 2:00 PM" />
          </div>
        </main>
      </div>
    </div>
  );
};
