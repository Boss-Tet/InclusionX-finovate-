import React from 'react';
import { DashboardShell, NavItem } from './DashboardShell';
import { MOCK_USERS, UserProfile } from '@/lib/mock/authMock';
import { LayoutDashboard, User, Users, ShieldAlert, Activity } from 'lucide-react';

export interface ShellProps {
  children: React.ReactNode;
  user?: UserProfile;
}

export const AdminShell: React.FC<ShellProps> = ({
  children,
  user = MOCK_USERS.admin,
}) => {
  const navItems: NavItem[] = [
    { label: 'Admin Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'User Directory', href: '/admin/dashboard#users', icon: <Users className="w-4 h-4" /> },
    { label: 'System Audit Logs', href: '/admin/dashboard#logs', icon: <ShieldAlert className="w-4 h-4" /> },
    { label: 'Metrics & Health', href: '/admin/dashboard#metrics', icon: <Activity className="w-4 h-4" /> },
    { label: 'Admin Profile', href: '/admin/profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <DashboardShell user={user} navItems={navItems} roleBadgeText="System Administrator">
      {children}
    </DashboardShell>
  );
};
