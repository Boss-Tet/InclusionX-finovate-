"use client";
import React from "react";
import { BankerSidebar } from "@/components/organisms/BankerSidebar/BankerSidebar";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Badge } from "@/components/atoms/Badge/Badge";
import { BankerLedgerEntry, BankerLedgerSummary } from "@/hooks/useBankerLedger";

export interface BankerDepositsTemplateProps {
  deposits: BankerLedgerEntry[];
  summaryTotals: BankerLedgerSummary;
}

export const BankerDepositsTemplate: React.FC<BankerDepositsTemplateProps> = ({ deposits, summaryTotals }) => (
  <div className="min-h-screen bg-[#F2F4F8] font-sans antialiased flex flex-col md:flex-row">
    <div className="hidden md:block"><BankerSidebar activePath="/bank-officer/deposits" /></div>
    <div className="flex-1 min-w-0 flex flex-col pb-12">

      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-[#EBEEF4] px-6 py-4">
        <h1 className="text-[19px] font-extrabold text-[#182233]">Deposits &amp; Ledger</h1>
        <p className="text-[12.5px] text-[#5C6B85] mt-0.5 font-medium">Group savings deposits, withdrawals and bank ledger</p>
      </header>

      <main className="p-4 md:p-6 flex flex-col gap-5">

        {/* Summary tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Deposits Today",    value: summaryTotals.depositsToday, icon: "arrow-down-circle" as const, color: "text-[#16A34A] bg-[#E5F7EA]" },
            { label: "Pending Reconciliation",  value: `${summaryTotals.pendingReconciliation} Entries`,   icon: "doc"              as const, color: "text-[#F97316] bg-[#FEF0E1]" },
            { label: "Total Ledger Balance",    value: summaryTotals.totalBalance,   icon: "wallet"           as const, color: "text-[#2F6FED] bg-[#E8EFFD]" },
          ].map((t, i) => (
            <div key={i} className="bg-white rounded-[16px] p-4.5 border border-[#EBEEF4] shadow-[0_2px_8px_rgba(11,30,58,0.04)] flex items-center gap-3.5">
              <div className={`w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0 ${t.color}`}>
                <Icon name={t.icon} className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[19px] font-extrabold text-[#182233]">{t.value}</div>
                <div className="text-[11.5px] text-[#5C6B85] font-medium mt-0.5">{t.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Ledger table */}
        <div className="bg-white rounded-[18px] shadow-[0_2px_10px_rgba(11,30,58,0.04)] border border-[#EBEEF4] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#EBEEF4]">
            <h2 className="text-[15px] font-extrabold text-[#182233]">Recent Ledger Entries</h2>
            <button className="text-[12.5px] font-bold text-[#2F6FED] hover:underline">Export CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[#F5F7FA] text-[11.5px] font-bold text-[#9AA6BC] text-left">
                  <th className="px-5 py-3">Group</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Method</th>
                  <th className="px-5 py-3">Date / Time</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((d, i) => (
                  <tr key={i} className="border-t border-[#F2F4F8] hover:bg-[#F5F7FA] transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-[#182233]">{d.group}</td>
                    <td className={`px-5 py-3.5 font-extrabold ${d.type === "deposit" ? "text-[#16A34A]" : "text-[#DC2626]"}`}>
                      {d.type === "deposit" ? "+" : "-"}{d.amount}
                    </td>
                    <td className="px-5 py-3.5 capitalize">
                      <Badge variant={d.type === "deposit" ? "green" : "red"} size="sm">{d.type}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-[#5C6B85]">{d.method}</td>
                    <td className="px-5 py-3.5 text-[#9AA6BC]">{d.date}</td>
                    <td className="px-5 py-3.5"><Badge variant="green" size="sm" dot>Posted</Badge></td>
                  </tr>
                ))}
                {deposits.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-[#9AA6BC] text-[13px]">
                      No ledger entries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
);
