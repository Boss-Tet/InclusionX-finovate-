"use client";
import React, { useState } from "react";
import { MemberSidebar } from "@/components/organisms/MemberSidebar/MemberSidebar";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";

export const MemberSavingsGoalTemplate: React.FC = () => {
  const [goalAmount] = useState(500000);
  const [saved] = useState(245000);
  const pct = Math.min(Math.round((saved / goalAmount) * 100), 100);

  return (
    <div className="min-h-screen bg-[#F1F4F2] font-sans antialiased flex flex-col md:flex-row">
      <div className="hidden md:block"><MemberSidebar activePath="/savings-goal" /></div>
      <div className="flex-1 min-w-0 flex flex-col pb-12">

        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-[#E9EDEA] px-7 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-[19px] font-extrabold text-[#1B2321]">Savings Goal</h1>
            <p className="text-[12.5px] text-[#5B6B65] mt-0.5">Track your personal savings milestones</p>
          </div>
          <Button theme="green" leftIcon={<Icon name="goal" className="w-4 h-4" />}>Set New Goal</Button>
        </header>

        <main className="p-4 md:p-7 flex flex-col gap-5">

          {/* Goal hero card */}
          <div className="bg-gradient-to-r from-[#123A29] to-[#2D7A52] rounded-[20px] p-6 text-white">
            <div className="text-[12.5px] text-[#B9D4C6] font-semibold mb-1">Annual Savings Target 2025</div>
            <div className="text-[32px] font-extrabold tracking-tight">MWK 500,000</div>
            <div className="text-[13px] text-[#B9D4C6] mt-1">MWK 245,000 saved · MWK 255,000 remaining</div>

            {/* Progress bar */}
            <div className="mt-5">
              <div className="flex justify-between text-[12px] font-bold mb-2">
                <span>Progress</span><span>{pct}%</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#5BE38A] rounded-full transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Monthly contributions mini chart */}
          <div className="bg-white rounded-[18px] p-5 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA]">
            <h2 className="text-[15px] font-extrabold text-[#1B2321] mb-4">Monthly Contribution Progress</h2>
            <div className="flex items-end gap-2 h-[110px]">
              {[35, 65, 50, 80, 49, 90, 75, 60, 45, 55, 70, 85].map((v, i) => {
                const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-[4px] bg-[#2D7A52]/15 overflow-hidden" style={{ height: "90px" }}>
                      <div className="w-full bg-[#2D7A52] rounded-[4px] transition-all duration-500" style={{ height: `${v}%`, marginTop: `${100 - v}%` }} />
                    </div>
                    <span className="text-[9.5px] text-[#94A29C] font-semibold">{months[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Milestone cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "50% Milestone",  target: "MWK 250,000", reached: true,  icon: "star" as const },
              { label: "75% Milestone",  target: "MWK 375,000", reached: false, icon: "goal" as const },
              { label: "100% Goal",      target: "MWK 500,000", reached: false, icon: "layers" as const },
            ].map((m, i) => (
              <div key={i} className={`rounded-[16px] p-4.5 border flex items-center gap-3.5 ${m.reached ? "bg-[#E3F3EA] border-[#C9EAD5]" : "bg-white border-[#E9EDEA]"}`}>
                <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center ${m.reached ? "bg-[#2D7A52] text-white" : "bg-[#F1F4F2] text-[#94A29C]"}`}>
                  <Icon name={m.icon} className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[13px] font-extrabold text-[#1B2321]">{m.label}</div>
                  <div className="text-[12px] text-[#5B6B65] mt-0.5">{m.target}</div>
                  <div className={`text-[11px] font-bold mt-1 ${m.reached ? "text-[#2D7A52]" : "text-[#94A29C]"}`}>{m.reached ? "✓ Reached" : "Not yet"}</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
