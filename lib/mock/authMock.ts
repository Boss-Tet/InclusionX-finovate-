export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'MEMBER' | 'CHAIRPERSON' | 'TREASURER' | 'SECRETARY' | 'BANK_OFFICER' | 'ADMIN';
  avatarUrl?: string;
  groupId: string;
  groupName: string;
  joinedDate: string;
  nationalId: string;
}

export const MOCK_USERS: Record<string, UserProfile> = {
  member: {
    id: 'usr-mem-01',
    name: 'Chifundo Banda',
    email: 'chifundo.banda@gmail.com',
    phone: '+265 999 123 456',
    role: 'MEMBER',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    groupId: 'grp-001',
    groupName: 'Tiyanjane Women VSLA',
    joinedDate: '2023-01-15',
    nationalId: 'MW-BLK-98231',
  },
  chairperson: {
    id: 'usr-chair-01',
    name: 'Grace Phiri',
    email: 'grace.phiri@tiyanjane.mw',
    phone: '+265 888 234 567',
    role: 'CHAIRPERSON',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    groupId: 'grp-001',
    groupName: 'Tiyanjane Women VSLA',
    joinedDate: '2022-05-10',
    nationalId: 'MW-BLK-77120',
  },
  treasurer: {
    id: 'usr-treas-01',
    name: 'Kondwani Mwale',
    email: 'kondwani.m@tiyanjane.mw',
    phone: '+265 991 345 678',
    role: 'TREASURER',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    groupId: 'grp-001',
    groupName: 'Tiyanjane Women VSLA',
    joinedDate: '2022-05-10',
    nationalId: 'MW-BLK-44390',
  },
  secretary: {
    id: 'usr-sec-01',
    name: 'Chingaipe Tembo',
    email: 'chingaipe.t@tiyanjane.mw',
    phone: '+265 993 456 789',
    role: 'SECRETARY',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80',
    groupId: 'grp-001',
    groupName: 'Tiyanjane Women VSLA',
    joinedDate: '2022-06-01',
    nationalId: 'MW-BLK-55912',
  },
  bank_officer: {
    id: 'usr-bank-01',
    name: 'Tamala Malunga',
    email: 'tamala.m@nationalbank.mw',
    phone: '+265 1 820 000',
    role: 'BANK_OFFICER',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    groupId: 'grp-001',
    groupName: 'National Bank Finovate Partner',
    joinedDate: '2021-11-20',
    nationalId: 'MW-LL-10029',
  },
  admin: {
    id: 'usr-adm-01',
    name: 'System Admin',
    email: 'admin@vslaconnect.mw',
    phone: '+265 999 000 000',
    role: 'ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    groupId: 'grp-sys',
    groupName: 'VSLA System Headquarters',
    joinedDate: '2021-01-01',
    nationalId: 'MW-HQ-00001',
  },
};
