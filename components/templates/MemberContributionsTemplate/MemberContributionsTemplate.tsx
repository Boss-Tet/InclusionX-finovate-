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

export const MemberContributionsTemplate: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#F1F4F2] font-sans antialiased flex flex-col md:flex-row">
      <div className="hidden md:block">
        <MemberSidebar />
      </div>

      <div className="flex-1 min-w-0 flex flex-col pb-12">
        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-[#E9EDEA] px-7 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-[19px] font-extrabold text-[#1B2321]">Contributions</h1>
            <p className="text-[12.5px] text-[#5B6B65] mt-0.5">Track and make group savings contributions</p>
          </div>
          <Button theme="green" leftIcon={<Icon name="arrow-down-circle" className="w-4 h-4" />} onClick={() => setShowModal(true)}>
            Make Contribution
          </Button>
        </header>

        <main className="p-4 md:p-7 flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard variant="member" icon="arrow-down-circle" iconBgColor="green" value="MWK 245,000" label="Total Contributions YTD" linkText="Download summary" />
            <StatCard variant="member" icon="wallet" iconBgColor="blue" value="MWK 25,000" label="Monthly Target" linkText="View schedule" />
            <StatCard variant="member" icon="goal" iconBgColor="purple" value="100%" label="Payment Compliance" linkText="View badge" />
          </div>

          <div className="bg-white rounded-[18px] p-5.5 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-extrabold text-[#1B2321]">Contribution History</h2>
              <span className="text-[12px] text-[#94A29C] font-semibold">Showing last 12 entries</span>
            </div>

            <div className="flex flex-col">
              <TransactionRow icon="arrow-down-circle" iconBgColor="green" title="Monthly Contribution — May 2025" subtitle="Mobile Money · Trans ID: TX-884192" amount="+ MWK 25,000" isPositive={true} />
              <TransactionRow icon="arrow-down-circle" iconBgColor="green" title="Monthly Contribution — Apr 2025" subtitle="Mobile Money · Trans ID: TX-773104" amount="+ MWK 25,000" isPositive={true} />
              <TransactionRow icon="arrow-down-circle" iconBgColor="green" title="Special Share Add-on" subtitle="Bank Transfer · Trans ID: TX-661902" amount="+ MWK 50,000" isPositive={true} />
              <TransactionRow icon="arrow-down-circle" iconBgColor="green" title="Monthly Contribution — Mar 2025" subtitle="Mobile Money · Trans ID: TX-551029" amount="+ MWK 25,000" isPositive={true} />
            </div>
          </div>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[20px] p-6 max-w-md w-full shadow-2xl flex flex-col gap-4">
            <h3 className="text-[17px] font-extrabold text-[#1B2321]">Make New Contribution</h3>
            <Input label="Contribution Amount (MWK)" placeholder="e.g. 25000" theme="green" fullWidth />
            <Input label="Mobile Money / Phone Number" placeholder="+265 999 000 000" theme="green" fullWidth />
            <div className="flex gap-3 justify-end mt-2">
              <Button variant="outline" theme="green" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button theme="green" onClick={() => setShowModal(false)}>Confirm Payment</Button>
            </div>
          </div>
        </div>
      )}
    
      <MobileBottomNav />

</div>
  );
};
