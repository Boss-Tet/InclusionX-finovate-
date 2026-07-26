import { useState, useEffect } from 'react';

export interface BankerGroupSummary {
  code: string;
  name: string;
  members: number;
  savings: string;
  loans: string;
  status: 'active' | 'flagged';
  risk: 'low' | 'medium' | 'high';
  theme: 'green' | 'blue' | 'purple' | 'orange' | 'red' | 'gray';
}

export interface BankerCreditApproval {
  id: string;
  group: string;
  amount: string;
  purpose: string;
  members: number;
  savings: string;
  status: 'pending' | 'approved' | 'rejected';
  score: number;
}

export function useBanker() {
  const [groups, setGroups] = useState<BankerGroupSummary[]>([]);
  const [approvals, setApprovals] = useState<BankerCreditApproval[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [portfolioRes, approvalsRes] = await Promise.all([
          fetch("/api/banker/portfolio"),
          fetch("/api/banker/approvals")
        ]);

        if (portfolioRes.ok) {
          const portfolioData = await portfolioRes.json();
          setGroups(portfolioData.groups);
        }

        if (approvalsRes.ok) {
          const approvalsData = await approvalsRes.json();
          setApprovals(approvalsData.approvals);
        }
      } catch (error) {
        console.error("Failed to fetch banker data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    groups,
    approvals,
    isLoading,
  };
}
