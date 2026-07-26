'use client';
import { BankerPortfolioTemplate } from "@/components/templates/BankerPortfolioTemplate/BankerPortfolioTemplate";
import { useBanker } from "@/hooks/useBanker";

export default function PortfolioPage() { 
  const { groups, isLoading } = useBanker();
  return <BankerPortfolioTemplate groups={groups} isLoading={isLoading} />; 
}
