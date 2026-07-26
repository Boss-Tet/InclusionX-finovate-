"use client";

import React, { useState } from "react";
import { Icon } from "@/components/atoms/Icon/Icon";
import { MemberSidebar } from "@/components/organisms/MemberSidebar/MemberSidebar";
import { StatCard } from "@/components/molecules/StatCard/StatCard";
import { PendingActionCard } from "@/components/molecules/PendingActionCard/PendingActionCard";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";

export const MemberWithdrawalsTemplate: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#F1F4F2] font-sans antialiased flex flex-col md:flex-row">
      <div className="hidden md:block">
        <MemberSidebar />
      </div>

      <div className="flex-1 min-w-0 flex flex-col pb-12">
        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-[#E9EDEA] px-7 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-[19px] font-extrabold text-[#1B2321]">Withdrawals &amp; Voting</h1>
            <p className="text-[12.5px] text-[#5B6B65] mt-0.5">Request savings payouts and vote on group withdrawal requests</p>
          </div>
          <Button theme="green" leftIcon={<Icon name="arrow-up-circle" className="w-4 h-4" />} onClick={() => setShowModal(true)}>
            Request Payout
          </Button>
        </header>

        <main className="p-4 md:p-7 flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard variant="member" icon="arrow-up-circle" iconBgColor="purple" value="MWK 45,000" label="Total Payouts Received" linkText="View history" />
            <StatCard variant="member" icon="vote" iconBgColor="blue" value="2 Votes Pending" label="Active Group Votes" linkText="Review all" />
            <StatCard variant="member" icon="goal" iconBgColor="green" value="MWK 48,750" label="Available Share Value" linkText="View shares" />
          </div>

          <div className="bg-white rounded-[18px] p-5.5 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA]">
            <h2 className="text-[15px] font-extrabold text-[#1B2321] mb-4">Pending Group Withdrawal Votes</h2>
            <PendingActionCard variant="orange" icon="arrow-up-circle" title="School Building Emergency Fund" subtitle="Requested by: Grace Banda · 25 May 2025" amount="Amount: MWK 120,000" badgeText="Awaiting Vote" actionText="Vote Now" />
            <PendingActionCard variant="blue" icon="doc" title="Community Welfare Distribution" subtitle="Requested by: Kondwani Banda · 20 May 2025" amount="Amount: MWK 80,000" badgeText="Under Review" actionText="Review Details" />
          </div>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[20px] p-6 max-w-md w-full shadow-2xl flex flex-col gap-4">
            <h3 className="text-[17px] font-extrabold text-[#1B2321]">Request Share Payout</h3>
            <Input label="Withdrawal Amount (MWK)" placeholder="e.g. 20000" theme="green" fullWidth />
            <Input label="Reason for Withdrawal" placeholder="e.g. Emergency, School fees" theme="green" fullWidth />
            <div className="flex gap-3 justify-end mt-2">
              <Button variant="outline" theme="green" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button theme="green" onClick={() => setShowModal(false)}>Submit Request</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
