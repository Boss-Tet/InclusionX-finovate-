import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Avatar } from '@/components/atoms/Avatar';
import { Badge } from '@/components/atoms/Badge';

import { Phone, Mail, Shield, Building } from 'lucide-react';

// Accepts both live session UserProfile and mock UserProfile
export interface ProfileDisplayUser {
  id?: string;
  // Real API fields
  fullName?: string;
  phoneNumber?: string;
  platformRole?: string;
  avatarUrl?: string | null;
  // Mock fields
  name?: string;
  phone?: string;
  role?: string;
  email?: string | null;
  groupName?: string;
  nationalId?: string;
  joinedDate?: string;
}

export interface ProfileSummaryProps {
  user: ProfileDisplayUser;
}

export const ProfileSummary: React.FC<ProfileSummaryProps> = ({ user }) => {
  const displayName = user.fullName ?? user.name ?? 'User';
  const displayRole = user.platformRole ?? user.role ?? '';
  const displayPhone = user.phoneNumber ?? user.phone ?? '';
  const displayAvatar = user.avatarUrl ?? undefined;

  return (
    <Card className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
        <Avatar name={displayName} src={displayAvatar} size="xl" />
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {displayName}
            </h3>
            <Badge variant="emerald">{displayRole}</Badge>
          </div>
          {user.groupName && (
            <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1">
              <Building className="w-3.5 h-3.5" />
              {user.groupName}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
        {user.email && (
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Mail className="w-4 h-4 text-slate-400" />
            <span>{user.email}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <Phone className="w-4 h-4 text-slate-400" />
          <span>{displayPhone}</span>
        </div>
        {user.nationalId && (
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Shield className="w-4 h-4 text-slate-400" />
            <span>National ID: {user.nationalId}</span>
          </div>
        )}
        {user.joinedDate && (
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-emerald-600">Member Since:</span>
            <span>{user.joinedDate}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
