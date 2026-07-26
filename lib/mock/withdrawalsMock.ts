import { WithdrawalWithVotes } from '@/types/financial';

export const MOCK_WITHDRAWALS: WithdrawalWithVotes[] = [
  {
    id: 'wth-001',
    groupId: 'grp-001',
    memberId: 'usr-mem-01',
    amountTambala: 5000000, // MWK 50,000.00
    reason: 'Emergency medical expenses',
    status: 'PENDING',
    createdAt: new Date('2026-07-22T08:30:00Z'),
    approveCount: 2,
    rejectCount: 0,
    quorumNeeded: 3,
    votes: [
      {
        id: 'wv-1',
        requestId: 'wth-001',
        voterId: 'usr-chair-01',
        decision: 'APPROVE',
        note: 'Emergency medical necessity verified',
        votedAt: new Date('2026-07-22T09:15:00Z'),
      },
      {
        id: 'wv-2',
        requestId: 'wth-001',
        voterId: 'usr-sec-01',
        decision: 'APPROVE',
        note: 'Agreed',
        votedAt: new Date('2026-07-22T10:00:00Z'),
      },
    ],
  },
  {
    id: 'wth-002',
    groupId: 'grp-001',
    memberId: 'usr-sec-01',
    amountTambala: 10000000, // MWK 100,000.00
    reason: 'Share-out partial distribution',
    status: 'APPROVED',
    createdAt: new Date('2026-06-10T11:00:00Z'),
    approveCount: 3,
    rejectCount: 0,
    quorumNeeded: 3,
    votes: [],
  },
];
