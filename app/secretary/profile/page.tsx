'use client';

import React from 'react';
import { SecretaryShell } from '@/components/templates/SecretaryShell';
import { ProfileSummary } from '@/components/molecules/ProfileSummary';
import { Card } from '@/components/atoms/Card';
import { FormField } from '@/components/molecules/FormField';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { useProfile } from '@/hooks/useProfile';
import { Lock, Save } from 'lucide-react';

export default function SecretaryProfilePage() {
  const { profile } = useProfile('secretary');

  return (
    <SecretaryShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <ProfileSummary user={profile} />
        <Card className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            Security Settings
          </h3>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Current Password">
                <Input type="password" placeholder="••••••••" />
              </FormField>
              <FormField label="New Password">
                <Input type="password" placeholder="••••••••" />
              </FormField>
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="primary" leftIcon={<Save className="w-4 h-4" />}>
                Update Password
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </SecretaryShell>
  );
}
