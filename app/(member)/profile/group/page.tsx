import React from "react";
import { ProfileSubpageTemplate } from "@/components/templates/ProfileSubpageTemplate/ProfileSubpageTemplate";

export default function GroupMembershipPage() {
  return (
    <ProfileSubpageTemplate title="Group Membership">
      <div className="bg-white rounded-[18px] p-6 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA] flex flex-col gap-4">
        <h3 className="text-[15px] font-extrabold text-[#1B2321]">Tikondane VSLA</h3>
        <p className="text-[13px] text-[#5B6B65]">You are an active member of this group.</p>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-[#F7F9F8] p-3 rounded-[10px]">
            <div className="text-[11px] font-bold text-[#94A29C]">Member ID</div>
            <div className="text-[14px] font-extrabold text-[#1B2321] mt-0.5">TVS-2025-001-MB04</div>
          </div>
          <div className="bg-[#F7F9F8] p-3 rounded-[10px]">
            <div className="text-[11px] font-bold text-[#94A29C]">Role</div>
            <div className="text-[14px] font-extrabold text-[#2D7A52] mt-0.5">Member</div>
          </div>
        </div>
      </div>
    </ProfileSubpageTemplate>
  );
}
