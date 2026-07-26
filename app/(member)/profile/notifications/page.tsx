import React from "react";
import { ProfileSubpageTemplate } from "@/components/templates/ProfileSubpageTemplate/ProfileSubpageTemplate";

export default function NotificationsPage() {
  return (
    <ProfileSubpageTemplate title="Notifications">
      <div className="bg-white rounded-[18px] p-6 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA] flex flex-col gap-4">
        <h3 className="text-[15px] font-extrabold text-[#1B2321]">Notification Preferences</h3>
        <p className="text-[12.5px] text-[#5B6B65] mb-2">Choose how you want to be notified about group activities and account updates.</p>
        
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2D7A52]" />
            <span className="text-[14px] text-[#1B2321] font-semibold">SMS Alerts</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2D7A52]" />
            <span className="text-[14px] text-[#1B2321] font-semibold">Email Notifications</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2D7A52]" />
            <span className="text-[14px] text-[#1B2321] font-semibold">Push Notifications</span>
          </label>
        </div>
      </div>
    </ProfileSubpageTemplate>
  );
}
