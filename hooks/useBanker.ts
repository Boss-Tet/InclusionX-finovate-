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
    // Mock fetching data for Bank Officer
    const mockGroups: BankerGroupSummary[] = [
      { code: "TVS-001", name: "Tikondane VSLA", members: 25, savings: "MWK 1,250,000", loans: "MWK 450,000", status: "active", risk: "low", theme: "green" },
      { code: "CWG-002", name: "Chikondi Women Group", members: 18, savings: "MWK 875,000", loans: "MWK 320,000", status: "active", risk: "medium", theme: "purple" },
      { code: "UFA-003", name: "Umodzi Farmers Club", members: 30, savings: "MWK 2,100,000", loans: "MWK 980,000", status: "active", risk: "low", theme: "blue" },
      { code: "TSA-004", name: "Tiwonge Savers", members: 22, savings: "MWK 650,000", loans: "MWK 280,000", status: "active", risk: "low", theme: "orange" },
      { code: "MAP-005", name: "Mapalo Community", members: 15, savings: "MWK 420,000", loans: "MWK 390,000", status: "flagged", risk: "high", theme: "red" },
      { code: "TSM-006", name: "Thousand Smiles Group", members: 28, savings: "MWK 1,560,000", loans: "MWK 510,000", status: "active", risk: "low", theme: "gray" },
    ];

    const mockApprovals: BankerCreditApproval[] = [
      { id: "CR-001", group: "Chikondi Women Group", amount: "MWK 1,500,000", purpose: "Agricultural Inputs", members: 18, savings: "MWK 875K", status: "pending", score: 82 },
      { id: "CR-002", group: "Umodzi Farmers Club", amount: "MWK 2,000,000", purpose: "Grain Warehouse Capital", members: 30, savings: "MWK 2.1M", status: "pending", score: 91 },
      { id: "CR-003", group: "Tiwonge Savers", amount: "MWK 800,000", purpose: "Micro-Loan Expansion", members: 22, savings: "MWK 650K", status: "pending", score: 74 },
      { id: "CR-004", group: "Tikondane VSLA", amount: "MWK 500,000", purpose: "Emergency Fund", members: 25, savings: "MWK 1.25M", status: "approved", score: 95 },
      { id: "CR-005", group: "Mapalo Community", amount: "MWK 1,200,000", purpose: "Business Capital", members: 15, savings: "MWK 420K", status: "rejected", score: 41 },
    ];

    // Simulate network delay
    const timer = setTimeout(() => {
      setGroups(mockGroups);
      setApprovals(mockApprovals);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return {
    groups,
    approvals,
    isLoading,
  };
}
