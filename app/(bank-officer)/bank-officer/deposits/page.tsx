"use client";
import { BankerDepositsTemplate } from "@/components/templates/BankerDepositsTemplate/BankerDepositsTemplate";
import { useBankerLedger } from "@/hooks/useBankerLedger";

export default function DepositsPage() {
  const { ledger, summaryTotals, isLoading } = useBankerLedger();

  if (isLoading) {
    return <div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-[#2F6FED] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return <BankerDepositsTemplate deposits={ledger} summaryTotals={summaryTotals} />;
}
