import React from 'react';
import { DashboardShell, NavItem } from './DashboardShell';
import { useSessionShell } from '@/hooks/useSessionShell';
import { LayoutDashboard, User, Calendar, FileText, Bell } from 'lucide-react';

export interface ShellProps {
  children: React.ReactNode;
}

export const SecretaryShell: React.FC<ShellProps> = ({ children }) => {
  const { user } = useSessionShell();
  const navItems: NavItem[] = [
    { label: 'Secretary Dashboard', href: '/secretary/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Meetings Schedule', href: '/secretary/dashboard#meetings', icon: <Calendar className="w-4 h-4" /> },
    { label: 'Meeting Minutes', href: '/secretary/dashboard#minutes', icon: <FileText className="w-4 h-4" /> },
    { label: 'Announcements', href: '/secretary/dashboard#announcements', icon: <Bell className="w-4 h-4" /> },
    { label: 'Secretary Profile', href: '/secretary/profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <DashboardShell user={user} navItems={navItems} roleBadgeText="Group Secretary">
      {children}
    </DashboardShell>
  );
};
