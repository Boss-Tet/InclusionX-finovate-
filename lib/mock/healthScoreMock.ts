import { GroupHealthSummary } from '@/types/financial';

export const MOCK_HEALTH_SUMMARIES: GroupHealthSummary[] = [
  {
    groupId: 'grp-001',
    groupName: 'Tiyanjane Women VSLA',
    memberCount: 25,
    latestScore: {
      score: 92,
      savingsComponent: 33,    // out of 35
      repaymentComponent: 34,  // out of 35
      attendanceComponent: 17, // out of 20
      governanceComponent: 8,  // out of 10
      computedAt: new Date('2026-07-24T00:00:00Z'),
    },
  },
  {
    groupId: 'grp-002',
    groupName: 'Chikonde Farmers Savings',
    memberCount: 30,
    latestScore: {
      score: 84,
      savingsComponent: 30,
      repaymentComponent: 30,
      attendanceComponent: 16,
      governanceComponent: 8,
      computedAt: new Date('2026-07-20T00:00:00Z'),
    },
  },
  {
    groupId: 'grp-003',
    groupName: 'Chinsapo Enterprise Circle',
    memberCount: 18,
    latestScore: {
      score: 76,
      savingsComponent: 26,
      repaymentComponent: 28,
      attendanceComponent: 14,
      governanceComponent: 8,
      computedAt: new Date('2026-07-15T00:00:00Z'),
    },
  },
];
