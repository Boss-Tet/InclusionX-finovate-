import React from "react";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface GroupRowData {
  rank: number;
  name: string;
  code: string;
  savings: string;
  members: number;
  growth: string;
}

const defaultGroups: GroupRowData[] = [
  { rank: 1, name: "Tikondane VSLA", code: "TVS-2025-001", savings: "MWK 1.25M", members: 25, growth: "+14.2%" },
  { rank: 2, name: "Chikondi Women Group", code: "CWG-2025-004", savings: "MWK 980K", members: 30, growth: "+11.8%" },
  { rank: 3, name: "Umodzi Farmers Club", code: "UFC-2025-012", savings: "MWK 840K", members: 22, growth: "+9.5%" },
  { rank: 4, name: "Tiwonge Savers", code: "TWS-2025-009", savings: "MWK 710K", members: 18, growth: "+8.1%" },
  { rank: 5, name: "Mapalo Community Group", code: "MCG-2025-015", savings: "MWK 620K", members: 20, growth: "+6.4%" },
];

export const TopGroupsTable: React.FC = () => {
  return (
    <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_10px_rgba(11,30,58,0.05)] border border-[#EBEEF4]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[15px] font-extrabold text-[#182233]">Top Performing Groups</span>
        <button className="text-[12.5px] font-bold text-[#2F6FED] hover:underline">View all 48</button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse min-w-[450px]">
          <thead>
            <tr className="border-b border-[#EBEEF4] text-left text-[11px] text-[#9AA6BC] font-bold uppercase tracking-wider">
              <th className="pb-2.5 w-8">#</th>
              <th className="pb-2.5">Group Name</th>
              <th className="pb-2.5">Total Savings</th>
              <th className="pb-2.5">Members</th>
              <th className="pb-2.5 text-right">Growth</th>
            </tr>
          </thead>
          <tbody>
            {defaultGroups.map((g) => (
              <tr key={g.code} className="border-b border-[#EBEEF4] last:border-b-0">
                <td className="py-3">
                  <div className="w-[22px] h-[22px] rounded-[6px] bg-[#E8EFFD] text-[#2F6FED] font-extrabold text-[11.5px] flex items-center justify-center">
                    {g.rank}
                  </div>
                </td>
                <td className="py-3">
                  <div className="font-bold text-[13px] text-[#182233]">{g.name}</div>
                  <div className="text-[11px] text-[#9AA6BC]">{g.code}</div>
                </td>
                <td className="py-3 font-semibold text-[13px] text-[#182233]">{g.savings}</td>
                <td className="py-3 text-[13px] text-[#5C6B85]">{g.members}</td>
                <td className="py-3 text-right">
                  <span className="inline-flex items-center gap-0.5 text-[#16A34A] font-bold text-[12.5px]">
                    <Icon name="trending-up" className="w-3 h-3" />
                    {g.growth}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
