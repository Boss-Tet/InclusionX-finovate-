import React from "react";
import { Icon, IconName } from "@/components/atoms/Icon/Icon";

export interface PendingActionCardProps {
  variant: "orange" | "blue";
  icon: IconName;
  title: string;
  subtitle: string;
  amount: string;
  badgeText?: string;
  actionText: string;
  onAction?: () => void;
}

export const PendingActionCard: React.FC<PendingActionCardProps> = ({
  variant,
  icon,
  title,
  subtitle,
  amount,
  badgeText = "Pending",
  actionText,
  onAction,
}) => {
  const isOrange = variant === "orange";

  const iconBg = isOrange ? "bg-[#FCEADC] text-[#E8873A]" : "bg-[#E7EFFD] text-[#3B7DDB]";
  const badgeStyles = isOrange ? "bg-[#FBDCC0] text-[#9A5518]" : "bg-[#D3E2FA] text-[#1E4C99]";
  const buttonStyles = isOrange ? "bg-[#2D7A52] hover:bg-[#1B5E3F]" : "bg-[#3B7DDB] hover:bg-[#2558C7]";

  return (
    <div className="flex gap-3 p-3.5 rounded-[12px] bg-white border border-[#EBEFED] hover:border-[#D5E4DC] hover:shadow-sm transition-all mb-2.5 last:mb-0">
      <div className={`w-[36px] h-[36px] rounded-[10px] flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon name={icon} className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-extrabold text-[#1B2321]">{title}</div>
        <div className="text-[11.5px] text-[#5B6B65] mt-0.5">{subtitle}</div>
        <div className="text-[12px] font-bold text-[#1B2321] mt-1.5">{amount}</div>
        <div className="flex items-center justify-between mt-2.5">
          <span className={`text-[10.5px] font-bold px-2.5 py-0.75 rounded-full ${badgeStyles}`}>
            {badgeText}
          </span>
          <button
            onClick={onAction}
            className={`cursor-pointer border-none rounded-[8px] px-3 py-1.5 text-[11.5px] font-bold text-white transition-colors active:scale-95 ${buttonStyles}`}
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};
