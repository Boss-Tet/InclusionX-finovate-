'use client';

import React from "react";
import { MemberLoansTemplate } from "@/components/templates/MemberLoansTemplate/MemberLoansTemplate";
import { useProfile } from "@/hooks/useProfile";
import { useLoans } from "@/hooks/useLoans";
import { setActiveGroupId } from "@/lib/api/client";

function getStoredGroupId(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("vsla_active_group_id") ?? "";
}

export default function MemberLoansPage() {
  const groupId = getStoredGroupId();
  if (groupId) setActiveGroupId(groupId);

  const { profile } = useProfile();
  const { loans, isLoading, applyLoan, repayLoan } = useLoans({
    groupId,
    memberId: profile?.userId,
    callerMemberId: profile?.userId,
  });

  const handleApply = async (principalTambala: number) => {
    await applyLoan(principalTambala);
  };

  const handleRepay = async (loanId: string, amountTambala: number) => {
    // Opens a repayment modal in a real implementation
    // For now we do nothing until a repayment amount UI is added
  };

  return (
    <MemberLoansTemplate
      loans={loans}
      isLoading={isLoading}
      onApplyLoan={handleApply}
      onRepay={handleRepay}
    />
  );
}
