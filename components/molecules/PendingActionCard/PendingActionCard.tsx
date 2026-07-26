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

  const cardStyles = isOrange
    ? "bg-[#FCEADC] border-l-[3.5px] border-l-[#E8873A]"
    : "bg-[#E7EFFD] border-l-[3.5px] border-l-[#3B7DDB]";

  const iconStyles = isOrange ? "text-[#E8873A]" : "text-[#3B7DDB]";

  const badgeStyles = isOrange
    ? "bg-[#FBDCC0] text-[#9A5518]"
    : "bg-[#D3E2FA] text-[#1E4C99]";

  const buttonStyles = isOrange ? "bg-[#2D7A52]" : "bg-[#3B7DDB]";

  return (
    <div className={`flex gap-3 p-3 rounded-[12px] ${cardStyles} mb-3 last:mb-0`}>
      <div className={`w-[34px] h-[34px] rounded-full bg-white flex items-center justify-center shrink-0 ${iconStyles}`}>
        <Icon name={icon} className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-extrabold text-[#1B2321]">{title}</div>
        <div className="text-[11.5px] text-[#5B6B65] mt-0.5">{subtitle}</div>
        <div className="text-[12px] font-bold text-[#1B2321] mt-1.5">{amount}</div>
        <div className="flex items-center justify-between mt-2">
          <span className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-full ${badgeStyles}`}>
            {badgeText}
          </span>
          <button
            onClick={onAction}
            className={`border-none rounded-[8px] px-3 py-1.5 text-[11.5px] font-bold text-white transition-opacity hover:opacity-90 ${buttonStyles}`}
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};
