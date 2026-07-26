import React from 'react';
import { DashboardShell, NavItem } from './DashboardShell';
import { useSessionShell } from '@/hooks/useSessionShell';
import {
  LayoutDashboard,
  User,
  Wallet,
  PiggyBank,
  LogOut,
  MessageSquare,
  Bot,
} from 'lucide-react';

export interface ShellProps {
  children: React.ReactNode;
}

export const MemberShell: React.FC<ShellProps> = ({ children }) => {
  const { user } = useSessionShell();
  const navItems: NavItem[] = [
    { label: 'Dashboard',     href: '/dashboard',    icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Contributions', href: '/contributions', icon: <Wallet className="w-4 h-4" /> },
    { label: 'Loans',         href: '/loans',         icon: <PiggyBank className="w-4 h-4" /> },
    { label: 'Withdrawals',   href: '/withdrawals',   icon: <LogOut className="w-4 h-4" /> },
    { label: 'Group Chat',    href: '/chat',          icon: <MessageSquare className="w-4 h-4" /> },
    { label: 'AI Assistant',  href: '/ai-assistant',  icon: <Bot className="w-4 h-4" /> },
    { label: 'My Profile',    href: '/profile',       icon: <User className="w-4 h-4" /> },
  ];

  return (
    <DashboardShell user={user} navItems={navItems} roleBadgeText="VSLA Member">
      {children}
    </DashboardShell>
  );
};
