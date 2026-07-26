import React from "react";
import { ProfileSubpageTemplate } from "@/components/templates/ProfileSubpageTemplate/ProfileSubpageTemplate";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";

export default function PaymentMethodsPage() {
  return (
    <ProfileSubpageTemplate title="Payment Methods">
      <div className="bg-white rounded-[18px] p-6 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA] flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[15px] font-extrabold text-[#1B2321]">Linked Accounts</h3>
          <Button theme="green" leftIcon={<Icon name="arrow-down-circle" className="w-4 h-4" />} size="sm">Add New</Button>
        </div>
        
        <div className="flex items-center gap-4 p-4 border border-[#EBEFED] rounded-[14px]">
          <div className="w-10 h-10 rounded-[10px] bg-[#FCEADC] text-[#E8873A] flex items-center justify-center">
            <Icon name="wallet" className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-[14px] font-bold text-[#1B2321]">Airtel Money</div>
            <div className="text-[12px] text-[#5B6B65]">0999 123 456</div>
          </div>
          <div className="text-[12px] font-bold text-[#2D7A52] bg-[#E3F3EA] px-2.5 py-1 rounded-full">Default</div>
        </div>

        <div className="flex items-center gap-4 p-4 border border-[#EBEFED] rounded-[14px]">
          <div className="w-10 h-10 rounded-[10px] bg-[#E6EEFA] text-[#4A7FC1] flex items-center justify-center">
            <Icon name="tag" className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-[14px] font-bold text-[#1B2321]">National Bank</div>
            <div className="text-[12px] text-[#5B6B65]">**** 4582</div>
          </div>
        </div>
      </div>
    </ProfileSubpageTemplate>
  );
}
