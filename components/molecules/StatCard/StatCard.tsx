import React from "react";
import { Icon, IconName } from "@/components/atoms/Icon/Icon";

export interface MemberStatProps {
  variant: "member";
  icon: IconName;
  iconBgColor?: "blue" | "green" | "purple";
  value: string;
  label: string;
  linkText?: string;
  onLinkClick?: () => void;
}

export interface BankerSlimStatProps {
  variant: "slim";
  label: string;
  value: string;
  deltaText?: string;
  deltaType?: "up" | "down" | "warn" | "alert";
}

export type StatCardProps = MemberStatProps | BankerSlimStatProps;

export const StatCard: React.FC<StatCardProps> = (props) => {
  if (props.variant === "slim") {
    const { label, value, deltaText, deltaType = "up" } = props;
    const deltaColors = {
      up: "text-[#16A34A] bg-[#E5F7EA]",
      down: "text-[#DC2626] bg-[#FDEAEA]",
      warn: "text-[#F97316] bg-[#FEF0E1]",
      alert: "text-[#DC2626] bg-[#FDEAEA]",
    };

    return (
      <div className="group bg-white rounded-[14px] p-3.5 shadow-[0_2px_10px_rgba(11,30,58,0.04)] hover:shadow-[0_8px_20px_rgba(11,30,58,0.09)] border border-[#EBEEF4] hover:border-[#3B82F6]/30 transition-all duration-200 hover:-translate-y-0.5">
        <div className="text-[11px] font-semibold text-[#5C6B85] group-hover:text-[#182233] transition-colors">{label}</div>
        <div className="text-[18px] font-extrabold text-[#182233] mt-1.5 leading-tight tracking-tight">{value}</div>
        {deltaText && (
          <div className="mt-2 flex items-center">
            <span className={`inline-flex items-center gap-1 text-[10.5px] font-bold px-2 py-0.5 rounded-full ${deltaColors[deltaType]}`}>
              {deltaType === "up" && <Icon name="trending-up" className="w-2.5 h-2.5" />}
              {deltaType === "down" && <Icon name="trending-down" className="w-2.5 h-2.5" />}
              {(deltaType === "warn" || deltaType === "alert") && <Icon name="shield-alert" className="w-2.5 h-2.5" />}
              <span>{deltaText}</span>
            </span>
          </div>
        )}
      </div>
    );
  }

  // Default: Member Stat Card
  const { icon, iconBgColor = "blue", value, label, linkText = "View details", onLinkClick } = props;

  const bgClasses = {
    blue: "bg-[#E7EFFD] text-[#3B7DDB] group-hover:scale-105",
    green: "bg-[#E3F3EA] text-[#2D7A52] group-hover:scale-105",
    purple: "bg-[#EFE9F9] text-[#8B6FC7] group-hover:scale-105",
  };

  return (
    <div className="group bg-white rounded-[18px] p-5 shadow-[0_2px_10px_rgba(18,58,41,0.04)] hover:shadow-[0_10px_25px_rgba(18,58,41,0.08)] border border-[#E9EDEA] hover:border-[#2D7A52]/30 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center mb-3.5 transition-transform duration-200 ${bgClasses[iconBgColor]}`}>
          <Icon name={icon} className="w-5 h-5" />
        </div>
        <div className="text-[21px] font-extrabold text-[#1B2321] tracking-tight">{value}</div>
        <div className="text-[12px] text-[#5B6B65] mt-1 font-medium">{label}</div>
      </div>
      {linkText && (
        <button
          onClick={onLinkClick}
          className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#2D7A52] group-hover:text-[#1B5E3F] transition-colors mt-4 text-left w-fit"
        >
          <span>{linkText}</span>
          <Icon name="arrow-right" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      )}
    </div>
  );
};
