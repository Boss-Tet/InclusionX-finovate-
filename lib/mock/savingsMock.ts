import { ContributionRecord, MemberBalanceSummary } from '@/types/financial';

export const MOCK_CONTRIBUTIONS: ContributionRecord[] = [
  {
    id: 'contrib-001',
    groupId: 'grp-001',
    memberId: 'usr-mem-01',
    amountTambala: 2500000, // MWK 25,000.00
    method: 'MOBILE_MONEY',
    status: 'APPROVED',
    cyclePeriod: '2026-07',
    recordedById: 'usr-treas-01',
    approvedById: 'usr-treas-01',
    createdAt: new Date('2026-07-01T10:00:00Z'),
  },
  {
    id: 'contrib-002',
    groupId: 'grp-001',
    memberId: 'usr-mem-01',
    amountTambala: 3000000, // MWK 30,000.00
    method: 'CASH',
    status: 'APPROVED',
    cyclePeriod: '2026-06',
    recordedById: 'usr-treas-01',
    approvedById: 'usr-treas-01',
    createdAt: new Date('2026-06-01T14:30:00Z'),
  },
  {
    id: 'contrib-003',
    groupId: 'grp-001',
    memberId: 'usr-mem-01',
    amountTambala: 2000000, // MWK 20,000.00
    method: 'MOBILE_MONEY',
    status: 'PENDING',
    cyclePeriod: '2026-07',
    recordedById: 'usr-mem-01',
    approvedById: null,
    createdAt: new Date('2026-07-24T09:15:00Z'),
  },
  {
    id: 'contrib-004',
    groupId: 'grp-001',
    memberId: 'usr-chair-01',
    amountTambala: 5000000, // MWK 50,000.00
    method: 'CARD',
    status: 'APPROVED',
    cyclePeriod: '2026-07',
    recordedById: 'usr-treas-01',
    approvedById: 'usr-treas-01',
    createdAt: new Date('2026-07-02T11:00:00Z'),
  },
  {
    id: 'contrib-005',
    groupId: 'grp-001',
    memberId: 'usr-sec-01',
    amountTambala: 2500000, // MWK 25,000.00
    method: 'CASH',
    status: 'APPROVED',
    cyclePeriod: '2026-07',
    recordedById: 'usr-treas-01',
    approvedById: 'usr-treas-01',
    createdAt: new Date('2026-07-03T08:45:00Z'),
  },
];

export const MOCK_MEMBER_BALANCES: MemberBalanceSummary = {
  memberId: 'usr-mem-01',
  groupId: 'grp-001',
  totalContributedTambala: 45000000, // MWK 450,000.00 total
  approvedContributions: 43000000,   // MWK 430,000.00
  pendingContributions: 2000000,     // MWK 20,000.00
};

export const MOCK_SAVINGS_HISTORY = [
  { month: 'Jan', amountTambala: 2500000 },
  { month: 'Feb', amountTambala: 3000000 },
  { month: 'Mar', amountTambala: 2500000 },
  { month: 'Apr', amountTambala: 4000000 },
  { month: 'May', amountTambala: 3500000 },
  { month: 'Jun', amountTambala: 3000000 },
  { month: 'Jul', amountTambala: 2500000 },
];
