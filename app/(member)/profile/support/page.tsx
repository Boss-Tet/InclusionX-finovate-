import React from "react";
import { ProfileSubpageTemplate } from "@/components/templates/ProfileSubpageTemplate/ProfileSubpageTemplate";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";

export default function SupportPage() {
  return (
    <ProfileSubpageTemplate title="Help & Support">
      <div className="bg-white rounded-[18px] p-6 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA] flex flex-col gap-4">
        <h3 className="text-[15px] font-extrabold text-[#1B2321]">Contact Finovate Malawi</h3>
        <p className="text-[12.5px] text-[#5B6B65]">Need help with VSLA Connect? Reach out to our support team.</p>
        
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex items-center gap-3 p-3 bg-[#F7F9F8] rounded-[10px]">
            <div className="w-8 h-8 rounded-full bg-[#E3F3EA] text-[#2D7A52] flex items-center justify-center">
              <Icon name="chat" className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#94A29C]">WhatsApp Support</div>
              <div className="text-[13px] font-extrabold text-[#1B2321]">+265 991 000 000</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#F7F9F8] rounded-[10px]">
            <div className="w-8 h-8 rounded-full bg-[#E6EEFA] text-[#4A7FC1] flex items-center justify-center">
              <Icon name="support" className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#94A29C]">Email Support</div>
              <div className="text-[13px] font-extrabold text-[#1B2321]">support@finovate.mw</div>
            </div>
          </div>
        </div>
        
        <Button theme="green" variant="outline" className="mt-2" fullWidth>View Frequently Asked Questions</Button>
      </div>
    </ProfileSubpageTemplate>
  );
}
