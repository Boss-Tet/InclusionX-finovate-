import React from "react";
import { ProfileSubpageTemplate } from "@/components/templates/ProfileSubpageTemplate/ProfileSubpageTemplate";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Icon } from "@/components/atoms/Icon/Icon";

export default function SecurityPage() {
  return (
    <ProfileSubpageTemplate title="Security Settings">
      
      {/* Two-Factor Authentication (2FA) */}
      <div className="bg-white rounded-[18px] p-6 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-extrabold text-[#1B2321]">Two-Factor Authentication (2FA)</h3>
            <p className="text-[12.5px] text-[#5B6B65] mt-0.5">Protect your account with an extra layer of security.</p>
          </div>
          <Badge variant="orange" size="sm">Disabled</Badge>
        </div>
        <div className="p-4 bg-[#F7F9F8] rounded-[14px] border border-[#E9EDEA] flex items-start gap-3 mt-1">
          <div className="w-8 h-8 rounded-full bg-[#E3F3EA] text-[#2D7A52] flex items-center justify-center shrink-0">
            <Icon name="shield-alert" className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-[13.5px] font-bold text-[#1B2321]">SMS Authentication</h4>
            <p className="text-[12px] text-[#5B6B65] mt-0.5">Receive a 6-digit code via SMS on +265 999 123 456 each time you log in.</p>
            <Button theme="green" size="sm" className="mt-3">Enable 2FA</Button>
          </div>
        </div>
      </div>

      {/* Advanced Security Toggles */}
      <div className="bg-white rounded-[18px] p-6 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA] flex flex-col gap-4">
        <h3 className="text-[15px] font-extrabold text-[#1B2321]">App Security</h3>
        
        <label className="flex items-center justify-between cursor-pointer py-1">
          <div>
            <div className="text-[14px] text-[#1B2321] font-semibold">Login Alerts</div>
            <div className="text-[12px] text-[#5B6B65] mt-0.5">Notify me of logins from new devices</div>
          </div>
          <div className="relative inline-block w-11 h-6 transition duration-200 ease-in-out bg-[#2D7A52] rounded-full">
            <span className="absolute left-[22px] top-1 bg-white w-4 h-4 rounded-full transition-transform"></span>
          </div>
        </label>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-[18px] p-6 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA] flex flex-col gap-4">
        <h3 className="text-[15px] font-extrabold text-[#1B2321]">Change Password</h3>
        <div className="flex flex-col gap-4 mt-1">
          <Input label="Current Password" type="password" theme="green" fullWidth />
          <Input label="New Password" type="password" theme="green" fullWidth />
          <Input label="Confirm New Password" type="password" theme="green" fullWidth />
        </div>
        <div className="flex justify-end mt-2">
          <Button theme="green">Update Password</Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-[18px] p-6 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA] flex flex-col gap-3">
        <h3 className="text-[15px] font-extrabold text-[#DC4B3F]">Danger Zone</h3>
        <p className="text-[12.5px] text-[#5B6B65]">If you no longer want to use VSLA Connect, you can request account deletion. This action is irreversible.</p>
        <div className="mt-1">
          <Button variant="outline" className="border-[#DC4B3F] text-[#DC4B3F] hover:bg-[#FCEAE9]">Delete Account</Button>
        </div>
      </div>
    </ProfileSubpageTemplate>
  );
}
