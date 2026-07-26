import { LoanWithVotes, RepaymentRecord } from '@/types/financial';

export const MOCK_LOANS: LoanWithVotes[] = [
  {
    id: 'loan-001',
    groupId: 'grp-001',
    memberId: 'usr-mem-01',
    principalTambala: 15000000, // MWK 150,000.00
    interestRate: 10, // 10%
    totalDueTambala: 16500000, // MWK 165,000.00
    amountRepaidTambala: 6500000, // MWK 65,000.00 repaid
    status: 'REPAYING',
    rejectionReason: null,
    requestedAt: new Date('2026-05-10T10:00:00Z'),
    approvedAt: new Date('2026-05-12T15:00:00Z'),
    disbursedAt: new Date('2026-05-13T09:00:00Z'),
    dueDate: new Date('2026-08-13T23:59:59Z'),
    repaidAt: null,
    remainingDueTambala: 10000000, // MWK 100,000.00
    votes: [
      {
        id: 'vote-1',
        loanId: 'loan-001',
        voterId: 'usr-chair-01',
        decision: 'APPROVE',
        note: 'Good savings history',
        votedAt: new Date('2026-05-11T12:00:00Z'),
      },
      {
        id: 'vote-2',
        loanId: 'loan-001',
        voterId: 'usr-treas-01',
        decision: 'APPROVE',
        note: 'Sufficient group liquidity',
        votedAt: new Date('2026-05-11T14:30:00Z'),
      },
    ],
  },
  {
    id: 'loan-002',
    groupId: 'grp-001',
    memberId: 'usr-sec-01',
    principalTambala: 20000000, // MWK 200,000.00
    interestRate: 10,
    totalDueTambala: 22000000,
    amountRepaidTambala: 0,
    status: 'PENDING',
    rejectionReason: null,
    requestedAt: new Date('2026-07-20T11:00:00Z'),
    approvedAt: null,
    disbursedAt: null,
    dueDate: null,
    repaidAt: null,
    remainingDueTambala: 22000000,
    votes: [
      {
        id: 'vote-3',
        loanId: 'loan-002',
        voterId: 'usr-chair-01',
        decision: 'APPROVE',
        note: 'Valid business expansion reason',
        votedAt: new Date('2026-07-21T09:00:00Z'),
      },
    ],
  },
  {
    id: 'loan-003',
    groupId: 'grp-001',
    memberId: 'usr-mem-01',
    principalTambala: 8000000, // MWK 80,000.00
    interestRate: 8,
    totalDueTambala: 8640000,
    amountRepaidTambala: 8640000,
    status: 'REPAID',
    rejectionReason: null,
    requestedAt: new Date('2026-01-10T10:00:00Z'),
    approvedAt: new Date('2026-01-11T12:00:00Z'),
    disbursedAt: new Date('2026-01-12T09:00:00Z'),
    dueDate: new Date('2026-04-12T23:59:59Z'),
    repaidAt: new Date('2026-04-05T16:00:00Z'),
    remainingDueTambala: 0,
    votes: [],
  },
];

export const MOCK_REPAYMENTS: RepaymentRecord[] = [
  {
    id: 'repay-001',
    loanId: 'loan-001',
    amountTambala: 3500000, // MWK 35,000.00
    method: 'MOBILE_MONEY',
    paidAt: new Date('2026-06-15T10:00:00Z'),
  },
  {
    id: 'repay-002',
    loanId: 'loan-001',
    amountTambala: 3000000, // MWK 30,000.00
    method: 'CASH',
    paidAt: new Date('2026-07-15T14:20:00Z'),
  },
];
