"use client";
import React, { useState } from "react";
import { BankerSidebar } from "@/components/organisms/BankerSidebar/BankerSidebar";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Input } from "@/components/atoms/Input/Input";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { BankerGroupSummary } from "@/hooks/useBanker";

type AvatarTheme = "green" | "blue" | "purple" | "orange" | "red" | "gray";

export interface BankerPortfolioTemplateProps {
  groups: BankerGroupSummary[];
  isLoading: boolean;
}

const riskBadge: Record<string, "green" | "orange" | "red"> = { low: "green", medium: "orange", high: "red" };
const statusBadge: Record<string, "green" | "red"> = { active: "green", flagged: "red" };

export const BankerPortfolioTemplate: React.FC<BankerPortfolioTemplateProps> = ({
  groups,
  isLoading,
}) => {
  const [search, setSearch] = useState("");
  const filtered = groups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()) || g.code.includes(search));

  return (
    <div className="min-h-screen bg-[#F2F4F8] font-sans antialiased flex flex-col md:flex-row">
      <div className="hidden md:block"><BankerSidebar activePath="/bank-officer/portfolio" /></div>
      <div className="flex-1 min-w-0 flex flex-col pb-12">

        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-[#EBEEF4] px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-[19px] font-extrabold text-[#182233]">VSLA Portfolio</h1>
            <p className="text-[12.5px] text-[#5C6B85] mt-0.5 font-medium">All managed VSLA groups · Southern Region</p>
          </div>
          <div className="flex items-center gap-3">
            <Input prefixIcon={<Icon name="search" className="w-4 h-4" />} placeholder="Search groups or codes..." value={search} onChange={e => setSearch(e.target.value)} theme="blue" inputSize="sm" />
          </div>
        </header>

        <main className="p-4 md:p-6 flex flex-col gap-5">

          {/* Summary stat row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {[
              { label: "Total Groups",    value: "24",          color: "text-[#2F6FED]", bg: "bg-[#E8EFFD]", icon: "users" as const },
              { label: "Total Members",   value: "248",         color: "text-[#16A34A]", bg: "bg-[#E5F7EA]", icon: "user"  as const },
              { label: "Total Savings",   value: "MWK 32.8M",  color: "text-[#2F6FED]", bg: "bg-[#E8EFFD]", icon: "wallet" as const },
              { label: "Risk Flagged",    value: "2",           color: "text-[#DC2626]", bg: "bg-[#FDEAEA]", icon: "shield-alert" as const },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-[14px] p-4 border border-[#EBEEF4] shadow-[0_2px_8px_rgba(11,30,58,0.04)] flex items-center gap-3">
                <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${s.bg} ${s.color}`}>
                  <Icon name={s.icon} className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-[18px] font-extrabold text-[#182233]">{s.value}</div>
                  <div className="text-[11.5px] text-[#5C6B85] font-medium">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Groups table */}
          <div className="bg-white rounded-[18px] shadow-[0_2px_10px_rgba(11,30,58,0.04)] border border-[#EBEEF4] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#EBEEF4] flex items-center justify-between">
              <h2 className="text-[15px] font-extrabold text-[#182233]">Managed VSLA Groups</h2>
              <span className="text-[12px] text-[#9AA6BC] font-semibold">{filtered.length} of 24 groups</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-[#F5F7FA] text-[11.5px] font-bold text-[#9AA6BC] text-left">
                    <th className="px-5 py-3">Group</th>
                    <th className="px-5 py-3">Code</th>
                    <th className="px-5 py-3">Members</th>
                    <th className="px-5 py-3">Total Savings</th>
                    <th className="px-5 py-3">Active Loans</th>
                    <th className="px-5 py-3">Risk Level</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-[#9AA6BC] text-sm font-medium">
                        Loading portfolio...
                      </td>
                    </tr>
                  )}
                  {!isLoading && filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-[#9AA6BC] text-sm font-medium">
                        No groups found matching your search.
                      </td>
                    </tr>
                  )}
                  {!isLoading && filtered.map((g) => (
                    <tr key={g.code} className="border-t border-[#EBEEF4] hover:bg-[#F8FAFC] transition-colors group cursor-pointer">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar initials={g.name.substring(0, 2).toUpperCase()} theme={g.theme as AvatarTheme} size="sm" />
                          <div>
                            <div className="font-bold text-[#182233] group-hover:text-[#2F6FED] transition-colors">{g.name}</div>
                            <div className="text-[11px] font-mono text-[#9AA6BC] mt-0.5">{g.code}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-[13px] text-[#5C6B85] font-semibold">{g.members}</td>
                      <td className="px-5 py-3 text-[13px] font-bold text-[#182233]">{g.savings}</td>
                      <td className="px-5 py-3 text-[13px] font-bold text-[#182233]">{g.loans}</td>
                      <td className="px-5 py-3">
                        <Badge variant={riskBadge[g.risk]} dot size="sm" className="capitalize">{g.risk} Risk</Badge>
                      </td>
                      <td className="px-5 py-3">
                        <Badge variant={statusBadge[g.status]} size="sm" className="capitalize">{g.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
