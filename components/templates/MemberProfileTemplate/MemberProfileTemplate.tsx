"use client";

import React from "react";
import { MemberSidebar } from "@/components/organisms/MemberSidebar/MemberSidebar";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";
import { Badge } from "@/components/atoms/Badge/Badge";

export const MemberProfileTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F1F4F2] font-sans antialiased flex flex-col md:flex-row">
      <div className="hidden md:block">
        <MemberSidebar />
      </div>

      <div className="flex-1 min-w-0 flex flex-col pb-12">
        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-[#E9EDEA] px-7 py-4">
          <h1 className="text-[19px] font-extrabold text-[#1B2321]">Member Profile</h1>
          <p className="text-[12.5px] text-[#5B6B65] mt-0.5">Manage personal details, security, and group membership</p>
        </header>

        <main className="p-4 md:p-7 flex flex-col gap-5 max-w-4xl">
          <div className="bg-white rounded-[18px] p-6 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA] flex flex-col sm:flex-row items-center gap-5">
            <Avatar initials="CB" theme="green" size="xl" />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-[18px] font-extrabold text-[#1B2321]">Chisomo Banda</h2>
                <Badge variant="green" dot>Verified Member</Badge>
              </div>
              <p className="text-[12.5px] text-[#5B6B65] mt-0.5">Tikondane VSLA · Member ID: TVS-2025-001-MB04</p>
            </div>
            <Button theme="green" variant="outline">Edit Photo</Button>
          </div>

          <div className="bg-white rounded-[18px] p-6 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA] flex flex-col gap-4">
            <h3 className="text-[15px] font-extrabold text-[#1B2321]">Personal Information</h3>
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
        </main>
      </div>
    </div>
  );
};
