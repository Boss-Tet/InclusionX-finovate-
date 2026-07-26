'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AuthShell } from '@/components/templates/AuthShell';
import { FormField } from '@/components/molecules/FormField';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Select } from '@/components/atoms/Select';
import { Mail, Lock, LogIn } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['MEMBER', 'CHAIRPERSON', 'TREASURER', 'SECRETARY', 'BANK_OFFICER', 'ADMIN']),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'chifundo.banda@gmail.com',
      password: 'password123',
      role: 'MEMBER',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    // Route to respective role dashboard
    const rolePath = data.role.toLowerCase().replace('_', '-');
    window.location.href = `/${rolePath}/dashboard`;
  };

  return (
    <AuthShell subtitle="Sign in to manage your VSLA savings & loan passbook">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="text-center pb-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Account Sign In
          </h2>
          <p className="text-xs text-slate-500">
            Select your role to access your portal
          </p>
        </div>

        <FormField label="Role Selection" error={errors.role?.message}>
          <Select
            {...register('role')}
            options={[
              { value: 'MEMBER', label: 'VSLA Member' },
              { value: 'CHAIRPERSON', label: 'Group Chairperson' },
              { value: 'TREASURER', label: 'Group Treasurer' },
              { value: 'SECRETARY', label: 'Group Secretary' },
              { value: 'BANK_OFFICER', label: 'Bank Partner Officer' },
              { value: 'ADMIN', label: 'System Admin' },
            ]}
          />
        </FormField>

        <FormField label="Email Address" error={errors.email?.message} required>
          <Input
            {...register('email')}
            placeholder="name@vslaconnect.mw"
            leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
            error={!!errors.email}
          />
        </FormField>

        <FormField label="Password" error={errors.password?.message} required>
          <Input
            {...register('password')}
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
            error={!!errors.password}
          />
        </FormField>

        <div className="flex items-center justify-between text-xs pt-1">
          <Link
            href="/register"
            className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
          >
            Create an Account
          </Link>
          <Link
            href="/forgot-password"
            className="text-slate-500 dark:text-slate-400 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isSubmitting}
          leftIcon={<LogIn className="w-5 h-5" />}
        >
          Sign In to Portal
        </Button>
      </form>
    </AuthShell>
  );
}
