import React from "react";
import { Icon, IconName } from "@/components/atoms/Icon/Icon";

export interface TransactionRowProps {
  icon: IconName;
  iconBgColor?: "green" | "blue" | "red" | "gold" | "purple" | "gray";
  title: string;
  subtitle: string;
  amount: string;
  isPositive?: boolean;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
  icon,
  iconBgColor = "green",
  title,
  subtitle,
  amount,
  isPositive = true,
}) => {
  const iconClasses = {
    green: "bg-[#E3F3EA] text-[#2D7A52]",
    blue: "bg-[#E7EFFD] text-[#3B7DDB]",
    red: "bg-[#FDEAEA] text-[#DC4B3F]",
    gold: "bg-[#FDF3D9] text-[#C99A1E]",
    purple: "bg-[#EFE9F9] text-[#8B6FC7]",
    gray: "bg-[#EEF0F4] text-[#8A93A6]",
  };

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-[#E9EDEA] last:border-b-0 last:pb-0">
      <div className={`w-[38px] h-[38px] rounded-full shrink-0 flex items-center justify-center ${iconClasses[iconBgColor]}`}>
        <Icon name={icon} className="w-[17px] h-[17px]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-bold text-[#1B2321] truncate">{title}</div>
        <div className="text-[11.5px] text-[#94A29C] mt-0.5 truncate">{subtitle}</div>
      </div>
      <div className={`text-[13px] font-extrabold whitespace-nowrap ${isPositive ? "text-[#2D7A52]" : "text-[#1B2321]"}`}>
        {amount}
      </div>
    </div>
  );
};
