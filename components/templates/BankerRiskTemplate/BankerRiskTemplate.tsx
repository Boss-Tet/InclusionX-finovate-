"use client";
import React from "react";
import { BankerSidebar } from "@/components/organisms/BankerSidebar/BankerSidebar";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";
import { BankerRiskFlag, BankerRiskMetrics } from "@/hooks/useBankerRisk";

const severityBadge: Record<string, "red" | "orange" | "gray"> = { high: "red", medium: "orange", low: "gray" };

export interface BankerRiskTemplateProps {
  flags: BankerRiskFlag[];
  metrics: BankerRiskMetrics;
}

export const BankerRiskTemplate: React.FC<BankerRiskTemplateProps> = ({ flags, metrics }) => (
  <div className="min-h-screen bg-[#F2F4F8] font-sans antialiased flex flex-col md:flex-row">
    <div className="hidden md:block"><BankerSidebar activePath="/bank-officer/risk" /></div>
    <div className="flex-1 min-w-0 flex flex-col pb-12">

      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-[#EBEEF4] px-6 py-4">
        <h1 className="text-[19px] font-extrabold text-[#182233]">Risk &amp; Compliance</h1>
        <p className="text-[12.5px] text-[#5C6B85] mt-0.5 font-medium">Identify and manage group-level financial risks</p>
      </header>

      <main className="p-4 md:p-6 flex flex-col gap-5">

        {/* Stat tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "High Risk Groups",   value: metrics.highRiskCount,  icon: "shield-alert" as const, color: "text-[#DC2626] bg-[#FDEAEA]" },
            { label: "Medium Risk Groups", value: metrics.mediumRiskCount,  icon: "shield-alert" as const, color: "text-[#F97316] bg-[#FEF0E1]" },
            { label: "Compliance Score",   value: metrics.complianceScore,icon: "trending-up"  as const, color: "text-[#16A34A] bg-[#E5F7EA]" },
          ].map((t, i) => (
            <div key={i} className="bg-white rounded-[16px] p-4.5 border border-[#EBEEF4] shadow-[0_2px_8px_rgba(11,30,58,0.04)] flex items-center gap-3.5">
              <div className={`w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0 ${t.color}`}>
                <Icon name={t.icon} className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[20px] font-extrabold text-[#182233]">{t.value}</div>
                <div className="text-[11.5px] text-[#5C6B85] font-medium">{t.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance score bar */}
        <div className="bg-white rounded-[18px] p-5 shadow-[0_2px_10px_rgba(11,30,58,0.04)] border border-[#EBEEF4]">
          <h2 className="text-[15px] font-extrabold text-[#182233] mb-4">Portfolio Compliance Overview</h2>
          {metrics.breakdown.map((bar, i) => (
            <div key={i} className="mb-4 last:mb-0">
              <div className="flex justify-between text-[12.5px] font-semibold text-[#5C6B85] mb-1.5">
                <span>{bar.label}</span>
                <span className={`font-extrabold ${bar.pct >= 85 ? "text-[#16A34A]" : bar.pct >= 70 ? "text-[#F97316]" : "text-[#DC2626]"}`}>{bar.pct}%</span>
              </div>
              <div className="h-2.5 bg-[#EBEEF4] rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${bar.pct >= 85 ? "bg-[#16A34A]" : bar.pct >= 70 ? "bg-[#F97316]" : "bg-[#DC2626]"}`} style={{ width: `${bar.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Risk flags */}
        <div className="bg-white rounded-[18px] shadow-[0_2px_10px_rgba(11,30,58,0.04)] border border-[#EBEEF4] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#EBEEF4]">
            <h2 className="text-[15px] font-extrabold text-[#182233]">Active Risk Flags</h2>
            <span className="text-[11.5px] font-bold text-[#DC2626] bg-[#FDEAEA] px-2.5 py-0.5 rounded-full">{flags.length} Active</span>
          </div>
          <div className="flex flex-col divide-y divide-[#F2F4F8]">
            {flags.length === 0 ? (
              <div className="px-5 py-8 text-center text-[#5C6B85] text-[13.5px]">No active risk flags detected across the portfolio.</div>
            ) : (
              flags.map((f, i) => (
                <div key={i} className="px-5 py-4 flex items-start gap-4 hover:bg-[#F5F7FA] transition-colors">
                  <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 mt-0.5 ${f.severity === "high" ? "bg-[#FDEAEA] text-[#DC2626]" : f.severity === "medium" ? "bg-[#FEF0E1] text-[#F97316]" : "bg-[#F2F4F8] text-[#9AA6BC]"}`}>
                    <Icon name="shield-alert" className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[14px] font-extrabold text-[#182233]">{f.group}</span>
                      <Badge variant={severityBadge[f.severity]} size="sm">{f.severity} risk</Badge>
                    </div>
                    <div className="text-[12.5px] text-[#5C6B85] mt-0.5">{f.issue}</div>
                    <div className="text-[11.5px] text-[#9AA6BC] mt-1">Flagged: {f.date} · Loans: {f.loans} · Savings: {f.savings}</div>
                  </div>
                  <Button variant="outline" theme="blue" size="sm">Action</Button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  </div>
);
