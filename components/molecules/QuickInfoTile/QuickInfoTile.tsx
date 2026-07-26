import React from "react";
import { Icon, IconName } from "@/components/atoms/Icon/Icon";

export interface QuickInfoTileProps {
  icon: IconName;
  label: string;
  value: string;
}

export const QuickInfoTile: React.FC<QuickInfoTileProps> = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-[34px] h-[34px] rounded-[9px] bg-[#E3F3EA] text-[#2D7A52] flex items-center justify-center shrink-0">
        <Icon name={icon} className="w-4 h-4" />
      </div>
      <div>
        <div className="text-[10.5px] text-[#94A29C] font-semibold uppercase tracking-wider">{label}</div>
        <div className="text-[13px] font-bold text-[#1B2321] mt-0.5">{value}</div>
      </div>
    </div>
  );
};
