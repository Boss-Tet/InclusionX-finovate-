import React, { useState } from 'react';
import { Card } from '@/components/atoms/Card';
import { Avatar } from '@/components/atoms/Avatar';
import { Badge } from '@/components/atoms/Badge';
import { SearchBar } from '@/components/molecules/SearchBar';
import { Users, Phone, Mail } from 'lucide-react';

// Accepts either live GroupMember (from useGroup) or legacy UserProfile (from mock)
export interface GroupMemberDisplay {
  id: string;
  fullName?: string;
  name?: string;
  roleInGroup?: string;
  role?: string;
  phoneNumber?: string;
  phone?: string;
  email?: string | null;
  avatarUrl?: string | null;
  status?: string;
}

export interface DirectoryMember {
  id: string;
  name: string;
  email?: string | null;
  phone: string;
  role: string;
  avatarUrl?: string | null;
}

export interface GroupDirectoryProps {
  members: GroupMemberDisplay[];
}

export const GroupDirectory: React.FC<GroupDirectoryProps> = ({ members }) => {
  const [query, setQuery] = useState('');

  const filtered = members.filter(
    (m) => {
      const displayName = m.fullName ?? m.name ?? '';
      const displayRole = m.roleInGroup ?? m.role ?? '';
      const contact = m.phoneNumber ?? m.phone ?? m.email ?? '';
      return (
        displayName.toLowerCase().includes(query.toLowerCase()) ||
        displayRole.toLowerCase().includes(query.toLowerCase()) ||
        contact.toLowerCase().includes(query.toLowerCase())
      );
    }
  );

  return (
    <Card className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            Group Member Roster ({members.length})
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Registered VSLA members and role assignments
          </p>
        </div>
        <SearchBar value={query} onChange={setQuery} placeholder="Search roster..." />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((member) => {
          const displayName = member.fullName ?? member.name ?? '';
          const displayRole = member.roleInGroup ?? member.role ?? '';
          const contact = member.phoneNumber ?? member.phone ?? '';
          return (
          <div
            key={member.id}
            className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 dark:bg-slate-800/40 dark:border-slate-800 space-y-3"
          >
            <div className="flex items-center gap-3">
              <Avatar name={displayName} src={member.avatarUrl ?? undefined} size="md" />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                  {displayName}
                </h4>
                <Badge size="sm" variant={displayRole === 'MEMBER' ? 'neutral' : 'emerald'}>
                  {displayRole}
                </Badge>
              </div>
            </div>

            <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800">
              <p className="flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5" /> {member.email || 'N/A'}
              </p>
              <p className="flex items-center gap-2 truncate">
                <Phone className="w-3.5 h-3.5" /> {contact}
              </p>
            </div>
          </div>
          );
        })}
      </div>
    </Card>
  );
};
