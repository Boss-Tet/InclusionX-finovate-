'use client';

import React from "react";
import { MemberDashboardTemplate } from "@/components/templates/MemberDashboardTemplate/MemberDashboardTemplate";
import { useProfile } from "@/hooks/useProfile";
import { useSavings } from "@/hooks/useSavings";
import { useLoans } from "@/hooks/useLoans";
import { useMeetings } from "@/hooks/useMeetings";
import { useGroup } from "@/hooks/useGroup";
import { setActiveGroupId } from "@/lib/api/client";

function getStoredGroupId(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("vsla_active_group_id") ?? "";
}

export default function MemberDashboardPage() {
  const groupId = getStoredGroupId();
  if (groupId) setActiveGroupId(groupId);

  const { profile } = useProfile();
  const { contributions, balanceTambala } = useSavings({ groupId, memberId: profile?.userId });
  const { loans } = useLoans({ groupId, callerMemberId: profile?.userId });
  const { meetings } = useMeetings(groupId);
  const { groupName, members, group } = useGroup(groupId);

  return (
    <MemberDashboardTemplate
      user={profile}
      groupName={groupName}
      membersCount={members.length}
      memberBalances={
        balanceTambala !== null
          ? {
              memberId: profile?.userId ?? "",
              groupId,
              totalContributedTambala: balanceTambala,
              approvedContributions: contributions.filter((c) => c.status === "APPROVED").length,
              pendingContributions: contributions.filter((c) => c.status === "PENDING").length,
            }
          : null
      }
      contributions={contributions}
      loans={loans}
      meetings={meetings}
      totalGroupSavings={group?.totalPoolTambala ?? 0}
    />
  );
}
