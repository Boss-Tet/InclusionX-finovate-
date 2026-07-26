import React, { useState } from 'react';
import { Card } from '@/components/atoms/Card';
import { Avatar } from '@/components/atoms/Avatar';
import { Badge } from '@/components/atoms/Badge';
import { SearchBar } from '@/components/molecules/SearchBar';
import { UserProfile } from '@/lib/mock/authMock';
import { Users, Phone, Mail } from 'lucide-react';

export interface GroupDirectoryProps {
  members: UserProfile[];
}

export const GroupDirectory: React.FC<GroupDirectoryProps> = ({ members }) => {
  const [query, setQuery] = useState('');

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.role.toLowerCase().includes(query.toLowerCase()) ||
      m.email.toLowerCase().includes(query.toLowerCase())
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
        {filtered.map((member) => (
          <div
            key={member.id}
            className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 dark:bg-slate-800/40 dark:border-slate-800 space-y-3"
          >
            <div className="flex items-center gap-3">
              <Avatar name={member.name} src={member.avatarUrl} size="md" />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                  {member.name}
                </h4>
                <Badge size="sm" variant={member.role === 'MEMBER' ? 'neutral' : 'emerald'}>
                  {member.role}
                </Badge>
              </div>
            </div>

            <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800">
              <p className="flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5" /> {member.email}
              </p>
              <p className="flex items-center gap-2 truncate">
                <Phone className="w-3.5 h-3.5" /> {member.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
