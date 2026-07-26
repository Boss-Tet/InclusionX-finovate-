"use client";

import Link from "next/link";
import { MobileBottomNav } from "@/components/organisms/MobileBottomNav/MobileBottomNav";
import React, { useState } from "react";
import { Icon } from "@/components/atoms/Icon/Icon";
import { MemberSidebar } from "@/components/organisms/MemberSidebar/MemberSidebar";
import { StatCard } from "@/components/molecules/StatCard/StatCard";
import { TransactionRow } from "@/components/molecules/TransactionRow/TransactionRow";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Badge } from "@/components/atoms/Badge/Badge";

export const MemberLoansTemplate: React.FC = () => {
  const [showApplyModal, setShowApplyModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#F1F4F2] font-sans antialiased flex flex-col md:flex-row">
      <div className="hidden md:block">
        <MemberSidebar />
      </div>

      <div className="flex-1 min-w-0 flex flex-col pb-12">
        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-[#E9EDEA] px-7 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-[19px] font-extrabold text-[#1B2321]">Loans &amp; Borrowing</h1>
            <p className="text-[12.5px] text-[#5B6B65] mt-0.5">Apply for loans and track repayment schedules</p>
          </div>
          <Button theme="green" leftIcon={<Icon name="hand-coin" className="w-4 h-4" />} onClick={() => setShowApplyModal(true)}>
            Apply for Loan
          </Button>
        </header>

        <main className="p-4 md:p-7 flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard variant="member" icon="wallet" iconBgColor="blue" value="MWK 120,000" label="Active Loan Balance" linkText="View schedule" />
            <StatCard variant="member" icon="goal" iconBgColor="green" value="MWK 15,000" label="Next Repayment Due" linkText="Pay now" />
            <StatCard variant="member" icon="star" iconBgColor="purple" value="MWK 300,000" label="Max Borrowing Limit" linkText="View terms" />
          </div>

          {/* Active Loan Details */}
          <div className="bg-white rounded-[18px] p-5.5 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[15px] font-extrabold text-[#1B2321]">Active Loan #LN-2025-001</span>
                <p className="text-[11.5px] text-[#5B6B65] mt-0.5">Business Expansion Loan</p>
              </div>
              <Badge variant="blue" dot>In Repayment</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-[14px] bg-[#F1F4F2]/60 border border-[#E9EDEA] mb-4">
              <div>
                <div className="text-[11px] text-[#94A29C] font-semibold">Principal</div>
                <div className="text-[14px] font-bold text-[#1B2321]">MWK 200,000</div>
              </div>
              <div>
                <div className="text-[11px] text-[#94A29C] font-semibold">Interest Rate</div>
                <div className="text-[14px] font-bold text-[#2D7A52]">10% / month</div>
              </div>
              <div>
                <div className="text-[11px] text-[#94A29C] font-semibold">Repaid</div>
                <div className="text-[14px] font-bold text-[#3B7DDB]">MWK 80,000</div>
              </div>
              <div>
                <div className="text-[11px] text-[#94A29C] font-semibold">Remaining</div>
                <div className="text-[14px] font-bold text-[#E8873A]">MWK 120,000</div>
              </div>
            </div>

            {/* Repayment History */}
            <div className="flex flex-col">
              <h3 className="text-[13.5px] font-bold text-[#1B2321] mb-2">Repayment History</h3>
              <TransactionRow icon="wallet" iconBgColor="blue" title="Repayment installment #2" subtitle="May 20, 2025 · Mobile Money" amount="- MWK 40,000" isPositive={false} />
              <TransactionRow icon="wallet" iconBgColor="blue" title="Repayment installment #1" subtitle="Apr 20, 2025 · Mobile Money" amount="- MWK 40,000" isPositive={false} />
            </div>
          </div>
        </main>
      </div>

      {showApplyModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[20px] p-6 max-w-md w-full shadow-2xl flex flex-col gap-4">
            <h3 className="text-[17px] font-extrabold text-[#1B2321]">Loan Application</h3>
            <Input label="Loan Amount Requested (MWK)" placeholder="e.g. 150000" theme="green" fullWidth />
            <Input label="Purpose of Loan" placeholder="e.g. Agricultural inputs, Business stock" theme="green" fullWidth />
            <Input label="Repayment Duration (Months)" placeholder="e.g. 3" theme="green" fullWidth />
            <div className="flex gap-3 justify-end mt-2">
              <Button variant="outline" theme="green" onClick={() => setShowApplyModal(false)}>Cancel</Button>
              <Button theme="green" onClick={() => setShowApplyModal(false)}>Submit Request</Button>
            </div>
          </div>
        </div>
      )}
    
      <MobileBottomNav />

</div>
  );
};
