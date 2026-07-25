'use client';

import React, { useState } from 'react';
import { MemberShell } from '@/components/templates/MemberShell';
import { LoanList } from '@/components/organisms/LoanList';
import { Modal } from '@/components/atoms/Modal';
import { FormField } from '@/components/molecules/FormField';
import { Input } from '@/components/atoms/Input';
import { TextArea } from '@/components/atoms/TextArea';
import { Button } from '@/components/atoms/Button';
import { useLoans } from '@/hooks/useLoans';
import { mwkToTambala, formatMWK } from '@/lib/utils/money';

export default function LoansPage() {
  const { loans, applyLoan } = useLoans();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amountMWK, setAmountMWK] = useState('100000');
  const [reason, setReason] = useState('Business inventory purchase');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amountMWK);
    if (!isNaN(val) && val > 0) {
      applyLoan(mwkToTambala(val), reason);
      setIsModalOpen(false);
    }
  };

  return (
    <MemberShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Micro-Loan Facility
            </h1>
            <p className="text-xs text-slate-500">
              Low-interest revolving credit backed by group savings
            </p>
          </div>
        </div>

        <LoanList
          loans={loans}
          onApplyNew={() => setIsModalOpen(true)}
          onRepay={(id) => alert(`Repayment modal for loan ${id}`)}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Apply for Micro-Loan"
          description="Submit a loan request for group voting and credit assessment"
        >
          <form onSubmit={handleApply} className="space-y-4">
            <FormField label="Requested Principal Amount (MWK)" required>
              <Input
                type="number"
                value={amountMWK}
                onChange={(e) => setAmountMWK(e.target.value)}
                placeholder="100000"
              />
            </FormField>

            <FormField label="Purpose / Business Reason" required>
              <TextArea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Detail why you require this credit line..."
              />
            </FormField>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-xs space-y-1">
              <p className="font-bold text-emerald-800 dark:text-emerald-300">
                Loan Calculation Terms:
              </p>
              <p className="text-emerald-700 dark:text-emerald-400">
                Interest Rate: 10% simple interest • Estimated Total Due:{' '}
                <strong>{formatMWK(mwkToTambala(parseFloat(amountMWK || '0') * 1.1))}</strong>
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Submit Loan Application
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </MemberShell>
  );
}
