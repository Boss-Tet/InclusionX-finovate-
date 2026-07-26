import React from "react";
import { ProfileSubpageTemplate } from "@/components/templates/ProfileSubpageTemplate/ProfileSubpageTemplate";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";

export default function PersonalInfoPage() {
  return (
    <ProfileSubpageTemplate title="Personal Information">
      <div className="bg-white rounded-[18px] p-6 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA] flex flex-col gap-4">
        <h3 className="text-[15px] font-extrabold text-[#1B2321]">Update Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Full Name" defaultValue="Chisomo Banda" theme="green" fullWidth />
          <Input label="Phone Number" defaultValue="+265 999 123 456" theme="green" fullWidth />
          <Input label="National ID / Passport" defaultValue="MW-NID-88219" theme="green" fullWidth />
          <Input label="Home Address" defaultValue="Area 25, Sector 4, Lilongwe" theme="green" fullWidth />
        </div>
        <div className="flex justify-end mt-2">
          <Button theme="green">Save Changes</Button>
        </div>
      </div>
    </ProfileSubpageTemplate>
  );
}
