'use client';

import React, { useState } from 'react';
import { MemberShell } from '@/components/templates/MemberShell';
import { WithdrawalHistory } from '@/components/organisms/WithdrawalHistory';
import { Modal } from '@/components/atoms/Modal';
import { FormField } from '@/components/molecules/FormField';
import { Input } from '@/components/atoms/Input';
import { TextArea } from '@/components/atoms/TextArea';
import { Button } from '@/components/atoms/Button';
import { useWithdrawals } from '@/hooks/useWithdrawals';
import { mwkToTambala } from '@/lib/utils/money';

export default function WithdrawalsPage() {
  const { withdrawals, requestWithdrawal } = useWithdrawals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amountMWK, setAmountMWK] = useState('50000');
  const [reason, setReason] = useState('Emergency medical expense');

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amountMWK);
    if (!isNaN(val) && val > 0) {
      requestWithdrawal(mwkToTambala(val), reason);
      setIsModalOpen(false);
    }
  };

  return (
    <MemberShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Withdrawal & Capital Share-Out
            </h1>
            <p className="text-xs text-slate-500">
              Emergency liquidity disbursements and cycle payouts
            </p>
          </div>
        </div>

        <WithdrawalHistory
          withdrawals={withdrawals}
          onRequestNew={() => setIsModalOpen(true)}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Request Emergency Capital Withdrawal"
          description="Requires quorum vote from group chairperson and executive committee"
        >
          <form onSubmit={handleRequest} className="space-y-4">
            <FormField label="Requested Amount (MWK)" required>
              <Input
                type="number"
                value={amountMWK}
                onChange={(e) => setAmountMWK(e.target.value)}
                placeholder="50000"
              />
            </FormField>

            <FormField label="Emergency Reason" required>
              <TextArea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain the emergency or share-out claim..."
              />
            </FormField>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Submit Withdrawal Request
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </MemberShell>
  );
}
