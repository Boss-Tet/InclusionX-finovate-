import React from 'react';
import { DashboardShell, NavItem } from './DashboardShell';
import { useSessionShell } from '@/hooks/useSessionShell';
import { LayoutDashboard, User, BookOpen, Wallet, ArrowDownLeft } from 'lucide-react';

export interface ShellProps {
  children: React.ReactNode;
}

export const TreasurerShell: React.FC<ShellProps> = ({ children }) => {
  const { user } = useSessionShell();
  const navItems: NavItem[] = [
    { label: 'Treasurer Dashboard', href: '/treasurer/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Cashbook Ledger', href: '/treasurer/dashboard#ledger', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Verify Contributions', href: '/treasurer/dashboard#contributions', icon: <Wallet className="w-4 h-4" /> },
    { label: 'Disbursements', href: '/treasurer/dashboard#disbursements', icon: <ArrowDownLeft className="w-4 h-4" /> },
    { label: 'Treasurer Profile', href: '/treasurer/profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <DashboardShell user={user} navItems={navItems} roleBadgeText="Group Treasurer">
      {children}
    </DashboardShell>
  );
};
