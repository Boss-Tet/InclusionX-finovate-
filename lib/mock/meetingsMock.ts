export interface MeetingRecord {
  id: string;
  groupId: string;
  title: string;
  date: string;
  time: string;
  location: string;
  agenda: string;
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
  attendeesCount: number;
  totalMembers: number;
  minutes?: string;
}

export const MOCK_MEETINGS: MeetingRecord[] = [
  {
    id: 'mtg-001',
    groupId: 'grp-001',
    title: 'Monthly Share-Purchase & Loan Voting',
    date: '2026-08-05',
    time: '14:00 - 16:30',
    location: 'Community Hall, Zone 4',
    agenda: '1. Monthly Share Collections\n2. Review & Vote on Pending Loans\n3. Financial Literacy Update',
    status: 'UPCOMING',
    attendeesCount: 0,
    totalMembers: 25,
  },
  {
    id: 'mtg-002',
    groupId: 'grp-001',
    title: 'Mid-Year Share-Out Audit Meeting',
    date: '2026-07-05',
    time: '14:00 - 17:00',
    location: 'Chinsapo School Grounds',
    agenda: 'Mid-year audit, cashbook verification, passbook reconciliation',
    status: 'COMPLETED',
    attendeesCount: 24,
    totalMembers: 25,
    minutes: 'All 24 present members paid their July shares. Cashbox balance was verified by Treasurer and Chairperson. Two emergency loans approved.',
  },
];
