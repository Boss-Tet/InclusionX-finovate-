"use client";

import React, { useState } from "react";
import { Icon } from "@/components/atoms/Icon/Icon";

interface ChartPoint {
  date: string;
  myContribution: string;
  groupTotal: string;
  cx: number;
  cyMy: number;
  cyGroup: number;
}

const pointsData: ChartPoint[] = [
  { date: "1 May",  myContribution: "MWK 10,000", groupTotal: "MWK 80,000",  cx: 40,  cyMy: 150, cyGroup: 150 },
  { date: "5 May",  myContribution: "MWK 35,000", groupTotal: "MWK 120,000", cx: 185, cyMy: 135, cyGroup: 122 },
  { date: "15 May", myContribution: "MWK 85,000", groupTotal: "MWK 165,000", cx: 340, cyMy: 110, cyGroup: 95 },
  { date: "25 May", myContribution: "MWK 180,000", groupTotal: "MWK 210,000", cx: 540, cyMy: 78,  cyGroup: 55 },
  { date: "31 May", myContribution: "MWK 245,000", groupTotal: "MWK 250,000", cx: 730, cyMy: 50,  cyGroup: 20 },
];

export const ContributionChart: React.FC = () => {
  const [activePoint, setActivePoint] = useState<ChartPoint | null>(null);

  return (
    <div className="bg-white rounded-[18px] p-5.5 shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA] hover:border-[#2D7A52]/20 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[16px] font-extrabold text-[#1B2321]">Contribution Overview</span>
          <p className="text-[11.5px] text-[#5B6B65] mt-0.5">Personal growth vs group performance</p>
        </div>
        <button className="text-[11.5px] font-bold text-[#5B6B65] hover:text-[#1B2321] flex items-center gap-1.5 border border-[#E9EDEA] bg-[#F1F4F2]/50 hover:bg-[#F1F4F2] px-3 py-1.5 rounded-[10px] transition-colors">
          <span>This Month</span>
          <Icon name="chevron-down" className="w-3 h-3" />
        </button>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox="0 0 760 190" className="w-full h-[190px] min-w-[550px]">
          <defs>
            <linearGradient id="myGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2D7A52" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2D7A52" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="10"  x2="760" y2="10"  stroke="#F1F4F2" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="55"  x2="760" y2="55"  stroke="#F1F4F2" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="100" x2="760" y2="100" stroke="#F1F4F2" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="145" x2="760" y2="145" stroke="#F1F4F2" strokeWidth="1" strokeDasharray="4 4" />

          {/* Y Axis labels */}
          <text x="4" y="14"  fontSize="10" fill="#94A29C" fontWeight="600" fontFamily="Inter">250K</text>
          <text x="4" y="59"  fontSize="10" fill="#94A29C" fontWeight="600" fontFamily="Inter">165K</text>
          <text x="4" y="104" fontSize="10" fill="#94A29C" fontWeight="600" fontFamily="Inter">85K</text>
          <text x="4" y="149" fontSize="10" fill="#94A29C" fontWeight="600" fontFamily="Inter">0</text>

          {/* Area fill under my contribution curve */}
          <polygon
            fill="url(#myGradient)"
            points="40,150 185,135 340,110 540,78 730,50 730,150 40,150"
          />

          {/* Group Total line (dashed gray) */}
          <polyline
            fill="none"
            stroke="#94A29C"
            strokeWidth="2"
            strokeDasharray="6 5"
            points="40,150 185,122 340,95 540,55 730,20"
          />

          {/* My Contributions line (solid green) */}
          <polyline
            fill="none"
            stroke="#2D7A52"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="40,150 185,135 340,110 540,78 730,50"
          />

          {/* Interactive Data points */}
          {pointsData.map((pt, i) => (
            <g key={i} className="cursor-pointer group" onMouseEnter={() => setActivePoint(pt)} onMouseLeave={() => setActivePoint(null)}>
              {/* Invisible touch circle for hover */}
              <circle cx={pt.cx} cy={pt.cyMy} r="14" fill="transparent" />
              {/* Outer halo on hover */}
              <circle cx={pt.cx} cy={pt.cyMy} r="7" fill="#2D7A52" fillOpacity="0.25" className="transition-all duration-200 group-hover:r-10" />
              {/* Inner white circle with green border */}
              <circle cx={pt.cx} cy={pt.cyMy} r="4" fill="#FFFFFF" stroke="#2D7A52" strokeWidth="3" />
            </g>
          ))}

          {/* X Axis dates */}
          {pointsData.map((pt, i) => (
            <text key={i} x={pt.cx} y="175" fontSize="10.5" fill="#5B6B65" fontWeight="600" textAnchor="middle" fontFamily="Inter">
              {pt.date}
            </text>
          ))}
        </svg>

        {/* Hover Tooltip display */}
        {activePoint && (
          <div
            className="absolute top-2 bg-[#1B2321] text-white rounded-[10px] px-3 py-2 text-[11px] shadow-lg pointer-events-none transition-all duration-150 border border-white/10"
            style={{ left: `${Math.min(Math.max(activePoint.cx - 50, 10), 620)}px` }}
          >
            <div className="font-bold text-[#5BE38A]">{activePoint.date}</div>
            <div>My: <span className="font-bold">{activePoint.myContribution}</span></div>
            <div className="text-[#94A29C]">Group: {activePoint.groupTotal}</div>
          </div>
        )}
      </div>

      <div className="flex gap-6 mt-3 border-t border-[#E9EDEA] pt-3">
        <span className="flex items-center gap-2 text-[12px] text-[#5B6B65] font-semibold">
          <span className="w-4 h-[3px] rounded-full bg-[#2D7A52]" />
          My Contributions
        </span>
        <span className="flex items-center gap-2 text-[12px] text-[#5B6B65] font-semibold">
          <span className="w-4 h-[3px] rounded-full bg-[repeating-linear-gradient(90deg,#94A29C_0_4px,transparent_4px_8px)]" />
          Group Total
        </span>
      </div>
    </div>
  );
};
