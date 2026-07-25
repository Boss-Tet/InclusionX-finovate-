import React from 'react';
import { DashboardShell, NavItem } from './DashboardShell';
import { MOCK_USERS, UserProfile } from '@/lib/mock/authMock';
import { LayoutDashboard, User, Building2, BarChart2, ShieldCheck } from 'lucide-react';

export interface ShellProps {
  children: React.ReactNode;
  user?: UserProfile;
}

export const BankOfficerShell: React.FC<ShellProps> = ({
  children,
  user = MOCK_USERS.bank_officer,
}) => {
  const navItems: NavItem[] = [
    { label: 'Bank Portfolio', href: '/bank-officer/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'VSLA Groups Directory', href: '/bank-officer/dashboard#groups', icon: <Building2 className="w-4 h-4" /> },
    { label: 'Credit Health Scores', href: '/bank-officer/dashboard#health', icon: <ShieldCheck className="w-4 h-4" /> },
    { label: 'Loan Underwriting', href: '/bank-officer/dashboard#analytics', icon: <BarChart2 className="w-4 h-4" /> },
    { label: 'Officer Profile', href: '/bank-officer/profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <DashboardShell user={user} navItems={navItems} roleBadgeText="Bank Partner Officer">
      {children}
    </DashboardShell>
  );
};
