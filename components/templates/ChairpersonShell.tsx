import React from 'react';
import { DashboardShell, NavItem } from './DashboardShell';
import { MOCK_USERS, UserProfile } from '@/lib/mock/authMock';
import { LayoutDashboard, User, CheckSquare, Users, Award } from 'lucide-react';

export interface ShellProps {
  children: React.ReactNode;
  user?: UserProfile;
}

export const ChairpersonShell: React.FC<ShellProps> = ({
  children,
  user = MOCK_USERS.chairperson,
}) => {
  const navItems: NavItem[] = [
    { label: 'Governance Overview', href: '/chairperson/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Pending Approvals', href: '/chairperson/dashboard#approvals', icon: <CheckSquare className="w-4 h-4" /> },
    { label: 'Member Roster', href: '/chairperson/dashboard#roster', icon: <Users className="w-4 h-4" /> },
    { label: 'Group Health Score', href: '/chairperson/dashboard#health', icon: <Award className="w-4 h-4" /> },
    { label: 'Chairperson Profile', href: '/chairperson/profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <DashboardShell user={user} navItems={navItems} roleBadgeText="Chairperson">
      {children}
    </DashboardShell>
  );
};
