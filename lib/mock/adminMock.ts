export interface SystemLog {
  id: string;
  action: string;
  user: string;
  role: string;
  ipAddress: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
}

export interface AdminMetrics {
  totalUsers: number;
  activeGroups: number;
  totalSavingsTambala: number;
  totalLoansTambala: number;
  healthScoreAvg: number;
}

export const MOCK_ADMIN_METRICS: AdminMetrics = {
  totalUsers: 1248,
  activeGroups: 52,
  totalSavingsTambala: 4850000000, // MWK 48,500,000.00
  totalLoansTambala: 1820000000,   // MWK 18,200,000.00
  healthScoreAvg: 88.5,
};

export const MOCK_SYSTEM_LOGS: SystemLog[] = [
  {
    id: 'log-1',
    action: 'USER_LOGIN',
    user: 'Grace Phiri',
    role: 'CHAIRPERSON',
    ipAddress: '197.218.42.10',
    timestamp: '2026-07-25 17:45:10',
    status: 'SUCCESS',
  },
  {
    id: 'log-2',
    action: 'RECORD_CONTRIBUTION',
    user: 'Kondwani Mwale',
    role: 'TREASURER',
    ipAddress: '197.218.42.12',
    timestamp: '2026-07-25 16:30:22',
    status: 'SUCCESS',
  },
  {
    id: 'log-3',
    action: 'LOAN_VOTE',
    user: 'Grace Phiri',
    role: 'CHAIRPERSON',
    ipAddress: '197.218.42.10',
    timestamp: '2026-07-24 11:20:00',
    status: 'SUCCESS',
  },
  {
    id: 'log-4',
    action: 'PASSWORD_RESET_FAIL',
    user: 'unknown@test.mw',
    role: 'UNKNOWN',
    ipAddress: '41.190.2.88',
    timestamp: '2026-07-24 09:12:44',
    status: 'FAILED',
  },
];
