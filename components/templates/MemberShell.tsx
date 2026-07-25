import React from 'react';
import { DashboardShell, NavItem } from './DashboardShell';
import { MOCK_USERS, UserProfile } from '@/lib/mock/authMock';
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
  user?: UserProfile;
}

export const MemberShell: React.FC<ShellProps> = ({
  children,
  user = MOCK_USERS.member,
}) => {
  const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/member/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Contributions', href: '/member/contributions', icon: <Wallet className="w-4 h-4" /> },
    { label: 'Loans', href: '/member/loans', icon: <PiggyBank className="w-4 h-4" /> },
    { label: 'Withdrawals', href: '/member/withdrawals', icon: <LogOut className="w-4 h-4" /> },
    { label: 'Group Chat', href: '/member/chat', icon: <MessageSquare className="w-4 h-4" /> },
    { label: 'AI Assistant', href: '/member/ai-assistant', icon: <Bot className="w-4 h-4" /> },
    { label: 'My Profile', href: '/member/profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <DashboardShell user={user} navItems={navItems} roleBadgeText="VSLA Member">
      {children}
    </DashboardShell>
  );
};
