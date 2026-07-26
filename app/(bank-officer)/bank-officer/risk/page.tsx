"use client";
import { BankerRiskTemplate } from "@/components/templates/BankerRiskTemplate/BankerRiskTemplate";
import { useBankerRisk } from "@/hooks/useBankerRisk";

export default function RiskPage() {
  const { flags, metrics, isLoading } = useBankerRisk();

  if (isLoading) {
    return <div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-[#2F6FED] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return <BankerRiskTemplate flags={flags} metrics={metrics} />;
}
