'use client';

import React from "react";
import { MemberProfileTemplate } from "@/components/templates/MemberProfileTemplate/MemberProfileTemplate";
import { useProfile } from "@/hooks/useProfile";
import { useGroup } from "@/hooks/useGroup";
import { setActiveGroupId } from "@/lib/api/client";

function getStoredGroupId(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("vsla_active_group_id") ?? "";
}

export default function MemberProfilePage() {
  const groupId = getStoredGroupId();
  if (groupId) setActiveGroupId(groupId);

  const { profile, isLoading } = useProfile();
  const { groupName } = useGroup(groupId);

  return (
    <MemberProfileTemplate
      profile={profile}
      groupName={groupName}
      isLoading={isLoading}
    />
  );
}
