"use client";
import { BankerReportsTemplate } from "@/components/templates/BankerReportsTemplate/BankerReportsTemplate";
import { useBankerReports } from "@/hooks/useBankerReports";

export default function ReportsPage() {
  const { kpis, isLoading } = useBankerReports();

  if (isLoading) {
    return <div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-[#2F6FED] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return <BankerReportsTemplate kpis={kpis} />;
}
