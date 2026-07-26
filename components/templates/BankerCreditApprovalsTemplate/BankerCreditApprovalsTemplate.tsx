"use client";
import React, { useState } from "react";
import { BankerSidebar } from "@/components/organisms/BankerSidebar/BankerSidebar";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";

type Filter = "all" | "pending" | "approved" | "rejected";

const approvals = [
  { id: "CR-001", group: "Chikondi Women Group",  amount: "MWK 1,500,000", purpose: "Agricultural Inputs",      members: 18, savings: "MWK 875K",  status: "pending",  score: 82 },
  { id: "CR-002", group: "Umodzi Farmers Club",   amount: "MWK 2,000,000", purpose: "Grain Warehouse Capital",  members: 30, savings: "MWK 2.1M",  status: "pending",  score: 91 },
  { id: "CR-003", group: "Tiwonge Savers",        amount: "MWK 800,000",   purpose: "Micro-Loan Expansion",     members: 22, savings: "MWK 650K",  status: "pending",  score: 74 },
  { id: "CR-004", group: "Tikondane VSLA",        amount: "MWK 500,000",   purpose: "Emergency Fund",           members: 25, savings: "MWK 1.25M", status: "approved", score: 95 },
  { id: "CR-005", group: "Mapalo Community",      amount: "MWK 1,200,000", purpose: "Business Capital",         members: 15, savings: "MWK 420K",  status: "rejected", score: 41 },
];

const statusBadge: Record<string, "orange" | "green" | "red"> = { pending: "orange", approved: "green", rejected: "red" };

export const BankerCreditApprovalsTemplate: React.FC = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = filter === "all" ? approvals : approvals.filter(a => a.status === filter);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#F2F4F8] font-sans antialiased flex flex-col md:flex-row">
      <div className="hidden md:block"><BankerSidebar activePath="/bank-officer/credit-approvals" /></div>
      <div className="flex-1 min-w-0 flex flex-col pb-12">

        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-[#EBEEF4] px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-[19px] font-extrabold text-[#182233]">Credit Approvals</h1>
            <p className="text-[12.5px] text-[#5C6B85] mt-0.5 font-medium">Review and action group credit line requests</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold px-3 py-1.5 rounded-full bg-[#FDEAEA] text-[#DC2626] animate-pulse">3 Pending</span>
          </div>
        </header>

        <main className="p-4 md:p-6 flex flex-col gap-5">

          {/* Filters */}
          <div className="flex gap-2">
            {(["all","pending","approved","rejected"] as Filter[]).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-[12.5px] font-bold border capitalize transition-all ${filter === f ? "bg-[#2F6FED] text-white border-[#2F6FED]" : "bg-white text-[#5C6B85] border-[#EBEEF4] hover:border-[#2F6FED]/40"}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Approval cards */}
          <div className="flex flex-col gap-3">
            {filtered.map(a => (
              <div key={a.id} className={`bg-white rounded-[16px] border transition-all shadow-[0_2px_8px_rgba(11,30,58,0.04)] ${selected === a.id ? "border-[#2F6FED] shadow-[0_4px_20px_rgba(47,111,237,0.12)]" : "border-[#EBEEF4] hover:border-[#BFCCEE]"}`}>
                <button className="w-full text-left px-5 py-4 flex items-center gap-4" onClick={() => setSelected(selected === a.id ? null : a.id)}>
                  <div className="w-10 h-10 rounded-[10px] bg-[#E8EFFD] text-[#2F6FED] flex items-center justify-center shrink-0">
                    <Icon name="doc" className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[14px] font-extrabold text-[#182233] truncate">{a.group}</span>
                      <Badge variant={statusBadge[a.status]} size="sm">{a.status}</Badge>
                    </div>
                    <div className="text-[12px] text-[#5C6B85] mt-0.5">{a.purpose} · <span className="font-bold text-[#182233]">{a.amount}</span></div>
                  </div>
                  <Icon name="chevron-down" className={`w-4 h-4 text-[#9AA6BC] shrink-0 transition-transform ${selected === a.id ? "rotate-180" : ""}`} />
                </button>

                {selected === a.id && (
                  <div className="border-t border-[#EBEEF4] px-5 py-4 flex flex-col gap-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { l: "Request ID",    v: a.id },
                        { l: "Members",       v: String(a.members) },
                        { l: "Group Savings", v: a.savings },
                        { l: "Credit Score",  v: `${a.score}/100` },
                      ].map((row, i) => (
                        <div key={i} className="bg-[#F5F7FA] rounded-[10px] p-3">
                          <div className="text-[11px] text-[#9AA6BC] font-bold">{row.l}</div>
                          <div className="text-[13.5px] font-extrabold text-[#182233] mt-0.5">{row.v}</div>
                        </div>
                      ))}
                    </div>
                    {/* Score bar */}
                    <div>
                      <div className="flex justify-between text-[11.5px] font-bold mb-1.5 text-[#5C6B85]">
                        <span>Credit Score</span><span className={`${a.score >= 75 ? "text-[#16A34A]" : a.score >= 50 ? "text-[#F97316]" : "text-[#DC2626]"}`}>{a.score}/100</span>
                      </div>
                      <div className="h-2.5 bg-[#EBEEF4] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${a.score >= 75 ? "bg-[#16A34A]" : a.score >= 50 ? "bg-[#F97316]" : "bg-[#DC2626]"}`} style={{ width: `${a.score}%` }} />
                      </div>
                    </div>
                    {a.status === "pending" && (
                      <div className="flex gap-3 justify-end">
                        <Button variant="outline" theme="blue">Request More Info</Button>
                        <Button variant="danger" theme="blue">Reject</Button>
                        <Button theme="blue">Approve Credit Line</Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
