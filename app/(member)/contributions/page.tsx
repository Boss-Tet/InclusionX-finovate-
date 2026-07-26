'use client';

import React from "react";
import { MemberContributionsTemplate } from "@/components/templates/MemberContributionsTemplate/MemberContributionsTemplate";
import { useProfile } from "@/hooks/useProfile";
import { useSavings } from "@/hooks/useSavings";
import { setActiveGroupId } from "@/lib/api/client";

function getStoredGroupId(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("vsla_active_group_id") ?? "";
}

export default function MemberContributionsPage() {
  const groupId = getStoredGroupId();
  if (groupId) setActiveGroupId(groupId);

  const { profile } = useProfile();
  const { contributions, balanceTambala, isLoading, logContribution } = useSavings({
    groupId,
    memberId: profile?.userId,
  });

  const handleContribute = async (amountTambala: number, phone: string) => {
    await logContribution(profile?.userId ?? "", amountTambala, "MOBILE_MONEY");
  };

  return (
    <MemberContributionsTemplate
      contributions={contributions}
      totalContributedTambala={balanceTambala ?? 0}
      isLoading={isLoading}
      onContribute={handleContribute}
    />
  );
}
