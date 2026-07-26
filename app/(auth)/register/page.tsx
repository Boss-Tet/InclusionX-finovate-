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
import { User, Mail, Phone, Lock, Shield, UserPlus } from 'lucide-react';

const registerSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(9, 'Please enter a valid Malawian phone number'),
  nationalId: z.string().min(5, 'National ID is required'),
  role: z.enum(['MEMBER', 'CHAIRPERSON', 'TREASURER', 'SECRETARY', 'BANK_OFFICER']),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '+265 ',
      nationalId: '',
      role: 'MEMBER',
      password: '',
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    const rolePath = data.role.toLowerCase().replace('_', '-');
    window.location.href = `/${rolePath}/dashboard`;
  };

  return (
    <AuthShell subtitle="Join a Village Savings & Loan Association digitally">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="text-center pb-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Register Member Account
          </h2>
          <p className="text-xs text-slate-500">
            Fill in your details to create your digital passbook
          </p>
        </div>

        <FormField label="Full Name" error={errors.fullName?.message} required>
          <Input
            {...register('fullName')}
            placeholder="Chifundo Banda"
            leftIcon={<User className="w-4 h-4 text-slate-400" />}
          />
        </FormField>

        <FormField label="Email Address" error={errors.email?.message} required>
          <Input
            {...register('email')}
            placeholder="chifundo@vslaconnect.mw"
            leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Phone Number" error={errors.phone?.message} required>
            <Input
              {...register('phone')}
              placeholder="+265 999 000 000"
              leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
            />
          </FormField>

          <FormField label="National ID" error={errors.nationalId?.message} required>
            <Input
              {...register('nationalId')}
              placeholder="MW-BLK-00000"
              leftIcon={<Shield className="w-4 h-4 text-slate-400" />}
            />
          </FormField>
        </div>

        <FormField label="Role Assignment" error={errors.role?.message}>
          <Select
            {...register('role')}
            options={[
              { value: 'MEMBER', label: 'VSLA Group Member' },
              { value: 'CHAIRPERSON', label: 'Chairperson' },
              { value: 'TREASURER', label: 'Treasurer' },
              { value: 'SECRETARY', label: 'Secretary' },
              { value: 'BANK_OFFICER', label: 'Bank Partner Officer' },
            ]}
          />
        </FormField>

        <FormField label="Password" error={errors.password?.message} required>
          <Input
            {...register('password')}
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
          />
        </FormField>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isSubmitting}
          leftIcon={<UserPlus className="w-5 h-5" />}
        >
          Create Account
        </Button>

        <p className="text-center text-xs text-slate-500 pt-2">
          Already registered?{' '}
          <Link
            href="/login"
            className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
          >
            Sign In Here
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
