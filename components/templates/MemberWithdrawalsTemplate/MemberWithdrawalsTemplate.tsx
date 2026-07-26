"use client";

import React, { useState } from "react";
import { Icon } from "@/components/atoms/Icon/Icon";
import { MemberSidebar } from "@/components/organisms/MemberSidebar/MemberSidebar";
import { MobileBottomNav } from "@/components/organisms/MobileBottomNav/MobileBottomNav";
import { StatCard } from "@/components/molecules/StatCard/StatCard";
import { PendingActionCard } from "@/components/molecules/PendingActionCard/PendingActionCard";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { WithdrawalWithVotes } from "@/types/financial";
import { formatMWK } from "@/lib/utils/money";
import { format } from "date-fns";

export interface MemberWithdrawalsTemplateProps {
  withdrawals: WithdrawalWithVotes[];
  myTotalSavingsTambala: number;
  isLoading: boolean;
  onRequestWithdrawal: (amountTambala: number, reason: string) => Promise<void>;
  onVote: (requestId: string, decision: "APPROVE" | "REJECT") => Promise<void>;
}

const VARIANT_MAP: Record<string, "orange" | "blue" | "green" | "red"> = {
  PENDING: "orange",
  APPROVED: "green",
  REJECTED: "red",
  PAID_OUT: "blue",
};

export const MemberWithdrawalsTemplate: React.FC<MemberWithdrawalsTemplateProps> = ({
  withdrawals,
  myTotalSavingsTambala,
  isLoading,
  onRequestWithdrawal,
  onVote,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const pendingVotes = withdrawals.filter((w) => w.status === "PENDING");
  const myWithdrawals = withdrawals.filter((w) => w.status === "PAID_OUT");
  const totalPaid = myWithdrawals.reduce((sum, w) => sum + w.amountTambala, 0);

  const handleSubmit = async () => {
    const amt = parseInt(amount) * 100;
    if (!amt || !reason.trim()) return;
    setSubmitting(true);
    try {
      await onRequestWithdrawal(amt, reason);
      setShowModal(false);
      setAmount("");
      setReason("");
    } finally {
      setSubmitting(false);
    }
  };

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
            <StatCard variant="member" icon="arrow-up-circle" iconBgColor="purple" value={formatMWK(totalPaid)} label="Total Payouts Received" linkText="View history" />
            <StatCard variant="member" icon="vote" iconBgColor="blue" value={`${pendingVotes.length} Votes Pending`} label="Active Group Votes" linkText="Review all" />
            <StatCard variant="member" icon="goal" iconBgColor="green" value={formatMWK(myTotalSavingsTambala)} label="Available Share Value" linkText="View shares" />
          </div>

          <div className="bg-white rounded-[18px] p-5.5 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA]">
            <h2 className="text-[15px] font-extrabold text-[#1B2321] mb-4">Pending Group Withdrawal Votes</h2>
            {isLoading && <div className="py-4 text-center text-sm text-[#94A29C]">Loading…</div>}
            {!isLoading && pendingVotes.length === 0 && (
              <div className="py-4 text-center text-sm text-[#94A29C]">No pending votes at this time.</div>
            )}
            {pendingVotes.map((w) => (
              <PendingActionCard
                key={w.id}
                variant={w.status === "PENDING" ? "orange" : "blue"}
                icon="arrow-up-circle"
                title={w.reason}
                subtitle={`Requested ${format(new Date(w.createdAt), "dd MMM yyyy")}`}
                amount={`Amount: ${formatMWK(w.amountTambala)}`}
                badgeText={`${w.approveCount}/${w.quorumNeeded} Votes`}
                actionText="Vote Now"
              />
            ))}
          </div>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[20px] p-6 max-w-md w-full shadow-2xl flex flex-col gap-4">
            <h3 className="text-[17px] font-extrabold text-[#1B2321]">Request Share Payout</h3>
            <Input label="Withdrawal Amount (MWK)" placeholder="e.g. 200" theme="green" fullWidth value={amount} onChange={(e) => setAmount(e.target.value)} />
            <Input label="Reason for Withdrawal" placeholder="e.g. Emergency, School fees" theme="green" fullWidth value={reason} onChange={(e) => setReason(e.target.value)} />
            <div className="flex gap-3 justify-end mt-2">
              <Button variant="outline" theme="green" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button theme="green" onClick={handleSubmit} disabled={submitting}>{submitting ? "Submitting…" : "Submit Request"}</Button>
            </div>
          </div>
        </div>
      )}

      <MobileBottomNav />
    </div>
  );
};

