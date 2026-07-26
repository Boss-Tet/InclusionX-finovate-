import { useState, useEffect } from 'react';

export interface BankerReportKPI {
  label: string;
  value: string;
  delta: string;
  color: string;
  icon: "wallet" | "hand-coin" | "trending-up" | "users";
}

export function useBankerReports() {
  const [kpis, setKpis] = useState<BankerReportKPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetch('/api/banker/reports');
        if (response.ok) {
          const data = await response.json();
          setKpis(data.kpis);
        }
      } catch (error) {
        console.error("Failed to fetch banker reports:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReports();
  }, []);

  return { kpis, isLoading };
}
