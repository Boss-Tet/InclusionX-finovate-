'use client';

import React, { useState } from 'react';
import { MemberShell } from '@/components/templates/MemberShell';
import { ContributionTable } from '@/components/organisms/ContributionTable';
import { Modal } from '@/components/atoms/Modal';
import { FormField } from '@/components/molecules/FormField';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { Button } from '@/components/atoms/Button';
import { useSavings } from '@/hooks/useSavings';
import { formatMWK, mwkToTambala } from '@/lib/utils/money';
import { Plus } from 'lucide-react';

export default function ContributionsPage() {
  const { contributions, balance, addContribution } = useSavings();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amountMWK, setAmountMWK] = useState('25000');
  const [method, setMethod] = useState<'CASH' | 'MOBILE_MONEY' | 'CARD'>('MOBILE_MONEY');

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amountMWK);
    if (!isNaN(val) && val > 0) {
      addContribution(mwkToTambala(val), method);
      setIsModalOpen(false);
    }
  };

  return (
    <MemberShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Savings & Share Contributions
            </h1>
            <p className="text-xs text-slate-500">
              Total Approved Savings Balance:{' '}
              <strong className="text-emerald-600 font-bold">
                {formatMWK(balance.approvedContributions)}
              </strong>
            </p>
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Record Share Purchase
          </Button>
        </div>

        <ContributionTable contributions={contributions} />

        {/* Deposit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Buy Share / Deposit Savings"
          description="Enter your monthly share amount and selected payment channel"
        >
          <form onSubmit={handleDeposit} className="space-y-4">
            <FormField label="Amount in Malawian Kwacha (MWK)" required>
              <Input
                type="number"
                value={amountMWK}
                onChange={(e) => setAmountMWK(e.target.value)}
                placeholder="25000"
              />
            </FormField>

            <FormField label="Payment Channel" required>
              <Select
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
                options={[
                  { value: 'MOBILE_MONEY', label: 'Airtel Money / TNM Mpamba' },
                  { value: 'CASH', label: 'Cash Payment to Treasurer' },
                  { value: 'CARD', label: 'Bank Debit Card' },
                ]}
              />
            </FormField>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Submit Contribution
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </MemberShell>
  );
}
