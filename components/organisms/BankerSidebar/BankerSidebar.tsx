import React from "react";
import { Icon, IconName } from "@/components/atoms/Icon/Icon";

interface NavItemData {
  label: string;
  icon: IconName;
  active?: boolean;
  badge?: string;
  href?: string;
}

const navItems: NavItemData[] = [
  { label: "Dashboard", icon: "grid", active: true },
  { label: "VSLA Portfolio", icon: "users" },
  { label: "Credit Approvals", icon: "doc", badge: "4" },
  { label: "Deposits & Ledger", icon: "wallet" },
  { label: "Risk & Compliance", icon: "shield-alert" },
  { label: "Reports & Analytics", icon: "trending-up" },
  { label: "Bank Profile", icon: "user" },
];

export const BankerSidebar: React.FC = () => {
  return (
    <aside className="w-[236px] shrink-0 bg-gradient-to-b from-[#0B1E3A] to-[#122A4D] text-white p-5 px-[14px] flex flex-col min-h-screen">
      {/* Brand header */}
      <div className="flex items-center gap-2.5 px-2 pb-5.5">
        <div className="w-[34px] h-[34px] rounded-[9px] bg-white/14 flex items-center justify-center shrink-0">
          <Icon name="logo" className="w-[18px] h-[18px] text-white" />
        </div>
        <div>
          <div className="text-[14px] font-extrabold tracking-wide">
            VLSI <span className="text-[#5B9CFF]">CONNECT</span>
          </div>
          <div className="text-[9.5px] text-[#9AA6BC] mt-0.5">Banker Portal</div>
        </div>
      </div>

      {/* Nav list */}
      <nav className="flex-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href || "#"}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] mb-0.5 text-[13.2px] font-semibold transition-colors ${
              item.active
                ? "bg-white text-[#122A4D]"
                : "text-[#AEBBD6] hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon name={item.icon} className="w-[16.5px] h-[16.5px] shrink-0" />
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-auto text-[10px] font-bold px-1.75 py-0.25 rounded-full bg-[#DC2626] text-white">
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </nav>

      {/* Footer logout */}
      <div className="border-t border-white/12 pt-2.5 mt-2">
        <a
          href="#"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[13.2px] font-semibold text-[#F3A79C] hover:bg-white/10"
        >
          <Icon name="logout" className="w-[16.5px] h-[16.5px] shrink-0" />
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
};
