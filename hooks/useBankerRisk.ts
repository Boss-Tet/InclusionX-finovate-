import { useState, useEffect } from 'react';

export interface BankerRiskFlag {
  id: string;
  group: string;
  issue: string;
  severity: "high" | "medium" | "low";
  date: string;
  loans: string;
  savings: string;
}

export interface BankerRiskMetrics {
  highRiskCount: string;
  mediumRiskCount: string;
  complianceScore: string;
  breakdown: Array<{ label: string; pct: number }>;
}

export function useBankerRisk() {
  const [flags, setFlags] = useState<BankerRiskFlag[]>([]);
  const [metrics, setMetrics] = useState<BankerRiskMetrics>({
    highRiskCount: "0",
    mediumRiskCount: "0",
    complianceScore: "0%",
    breakdown: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRisk() {
      try {
        const response = await fetch('/api/banker/risk');
        if (response.ok) {
          const data = await response.json();
          setFlags(data.flags);
          setMetrics(data.metrics);
        }
      } catch (error) {
        console.error("Failed to fetch banker risk:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRisk();
  }, []);

  return { flags, metrics, isLoading };
}
