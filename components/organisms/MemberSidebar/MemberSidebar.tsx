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
  { label: "My Group", icon: "users" },
  { label: "Contributions", icon: "arrow-down-circle" },
  { label: "Loans", icon: "hand-coin" },
  { label: "Withdrawals", icon: "arrow-up-circle", badge: "2" },
  { label: "Savings Goal", icon: "goal" },
  { label: "Messages", icon: "chat", badge: "3" },
  { label: "Documents", icon: "doc" },
  { label: "Profile", icon: "user" },
  { label: "Support", icon: "support" },
];

export const MemberSidebar: React.FC = () => {
  return (
    <aside className="w-[246px] shrink-0 bg-gradient-to-b from-[#123A29] to-[#164A34] text-white p-5 px-[14px] flex flex-col min-h-screen">
      {/* Brand header */}
      <div className="flex items-center gap-2.5 px-2 pb-5.5">
        <div className="w-[34px] h-[34px] rounded-[9px] bg-white/14 flex items-center justify-center shrink-0">
          <Icon name="logo" className="w-[18px] h-[18px] text-white" />
        </div>
        <div>
          <div className="text-[14.5px] font-extrabold tracking-wide">VLSI CONNECT</div>
          <div className="text-[9.5px] text-[#9FC7B0] mt-0.5">Save Together, Grow Together</div>
        </div>
      </div>

      {/* Nav list */}
      <nav className="flex-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href || "#"}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] mb-0.75 text-[13.5px] font-semibold transition-colors ${
              item.active
                ? "bg-white text-[#1B5E3F]"
                : "text-[#C7DED2] hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon name={item.icon} className="w-[17px] h-[17px] shrink-0" />
            <span>{item.label}</span>
            {item.badge && (
              <span
                className={`ml-auto text-[10px] font-bold px-1.75 py-0.25 rounded-full text-white ${
                  item.active ? "bg-[#1B5E3F]" : "bg-[#E8873A]"
                }`}
              >
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
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[13.5px] font-semibold text-[#F3A79C] hover:bg-white/10"
        >
          <Icon name="logout" className="w-[17px] h-[17px] shrink-0" />
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
};
