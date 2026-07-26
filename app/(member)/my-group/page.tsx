'use client';

import React from "react";
import { MemberMyGroupTemplate } from "@/components/templates/MemberMyGroupTemplate/MemberMyGroupTemplate";
import { useGroup } from "@/hooks/useGroup";
import { useMeetings } from "@/hooks/useMeetings";
import { setActiveGroupId } from "@/lib/api/client";

function getStoredGroupId(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("vsla_active_group_id") ?? "";
}

export default function MemberMyGroupPage() {
  const groupId = getStoredGroupId();
  if (groupId) setActiveGroupId(groupId);

  const { group, members, groupHealth, isLoading } = useGroup(groupId);
  const { meetings } = useMeetings(groupId);

  return (
    <MemberMyGroupTemplate
      group={group}
      members={members}
      meetings={meetings}
      groupHealth={groupHealth}
      isLoading={isLoading}
    />
  );
}
