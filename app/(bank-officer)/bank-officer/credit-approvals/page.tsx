'use client';
import { BankerCreditApprovalsTemplate } from "@/components/templates/BankerCreditApprovalsTemplate/BankerCreditApprovalsTemplate";
import { useBanker } from "@/hooks/useBanker";

export default function CreditApprovalsPage() { 
  const { approvals, isLoading } = useBanker();
  return <BankerCreditApprovalsTemplate approvals={approvals} isLoading={isLoading} />; 
}
