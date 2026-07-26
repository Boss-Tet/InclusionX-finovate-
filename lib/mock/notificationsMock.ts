export interface NotificationRecord {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  read: boolean;
}

export const MOCK_NOTIFICATIONS: NotificationRecord[] = [
  {
    id: 'notif-1',
    title: 'Contribution Approved',
    message: 'Your monthly share of MWK 25,000.00 was approved by Treasurer Kondwani.',
    timestamp: '2 hours ago',
    type: 'SUCCESS',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Loan Voting Required',
    message: 'A loan application for Chingaipe Tembo requires chairperson approval.',
    timestamp: '1 day ago',
    type: 'WARNING',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Upcoming Meeting',
    message: 'Monthly share-purchase meeting scheduled for Aug 5 at Community Hall.',
    timestamp: '2 days ago',
    type: 'INFO',
    read: true,
  },
];
