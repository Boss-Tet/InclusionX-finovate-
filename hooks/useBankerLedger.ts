import { useState, useEffect } from 'react';

export interface BankerLedgerEntry {
  id: string;
  group: string;
  amount: string;
  date: string;
  type: "deposit" | "withdrawal";
  method: string;
}

export interface BankerLedgerSummary {
  depositsToday: string;
  pendingReconciliation: number;
  totalBalance: string;
}

export function useBankerLedger() {
  const [ledger, setLedger] = useState<BankerLedgerEntry[]>([]);
  const [summaryTotals, setSummaryTotals] = useState<BankerLedgerSummary>({
    depositsToday: "MWK 0",
    pendingReconciliation: 0,
    totalBalance: "MWK 0"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLedger() {
      try {
        const response = await fetch('/api/banker/ledger');
        if (response.ok) {
          const data = await response.json();
          setLedger(data.ledger);
          setSummaryTotals(data.summaryTotals);
        }
      } catch (error) {
        console.error("Failed to fetch banker ledger:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLedger();
  }, []);

  return { ledger, summaryTotals, isLoading };
}
