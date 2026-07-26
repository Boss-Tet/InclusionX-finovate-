'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { AuthShell } from '@/components/templates/AuthShell';
import { FormField } from '@/components/molecules/FormField';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Phone, Lock, LogIn, AlertCircle, KeyRound } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { roleToDashboardPath } from '@/lib/auth/session';
import { ApiError } from '@/lib/api/client';

// Backend expects phoneNumber in E.164 format: +265xxxxxxxxx
const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+\d{7,15}$/, 'Enter phone in E.164 format, e.g. +265991234567'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Step shown after login when 2FA is required.
const twoFaSchema = z.object({
  code: z
    .string()
    .min(6, 'Enter your 6-digit authenticator code')
    .max(8, 'Code is too long'),
});
type TwoFaFormData = z.infer<typeof twoFaSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [twoFaError, setTwoFaError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phoneNumber: '+265', password: '' },
  });

  const {
    register: register2fa,
    handleSubmit: handleSubmit2fa,
    formState: { errors: errors2fa, isSubmitting: isSubmitting2fa },
  } = useForm<TwoFaFormData>({ resolver: zodResolver(twoFaSchema) });

  const onSubmit = async (data: LoginFormData) => {
    setApiError(null);
    try {
      const { requires2fa } = await login(data.phoneNumber, data.password);
      if (requires2fa) {
        setStep('2fa');
      } else {
        // Re-fetch session to get role, then redirect.
        const meRes = await fetch('/api/auth/me');
        const me = await meRes.json();
        const role: string = me?.data?.platformRole ?? 'MEMBER';
        router.push(roleToDashboardPath(role));
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setApiError(err.message);
      } else {
        setApiError('Network error. Please check your connection.');
      }
    }
  };

  const onSubmit2fa = async (data: TwoFaFormData) => {
    setTwoFaError(null);
    try {
      const res = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: data.code }),
      });
      const json = await res.json();
      if (!json.success) {
        setTwoFaError(typeof json.error === 'string' ? json.error : 'Invalid code.');
        return;
      }
      // Full session now issued — get role and redirect.
      const meRes = await fetch('/api/auth/me');
      const me = await meRes.json();
      const role: string = me?.data?.platformRole ?? 'MEMBER';
      router.push(roleToDashboardPath(role));
    } catch {
      setTwoFaError('Network error. Please try again.');
    }
  };

  if (step === '2fa') {
    return (
      <AuthShell subtitle="Two-Factor Authentication">
        <form onSubmit={handleSubmit2fa(onSubmit2fa)} className="space-y-4">
          <div className="text-center pb-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <KeyRound className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Verification Required
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>

          <FormField label="Authenticator Code" error={errors2fa.code?.message} required>
            <Input
              {...register2fa('code')}
              placeholder="000000"
              maxLength={8}
              className="text-center text-2xl tracking-widest font-mono"
            />
          </FormField>

          {twoFaError && (
            <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{twoFaError}</span>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isSubmitting2fa}
          >
            Verify & Sign In
          </Button>

          <button
            type="button"
            onClick={() => setStep('credentials')}
            className="text-xs text-slate-500 underline w-full text-center"
          >
            ← Back to Sign In
          </button>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell subtitle="Sign in to manage your VSLA savings & loan passbook">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="text-center pb-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Account Sign In
          </h2>
          <p className="text-xs text-slate-500">Enter your phone number and password</p>
        </div>

        <FormField label="Phone Number" error={errors.phoneNumber?.message} required>
          <Input
            {...register('phoneNumber')}
            type="tel"
            placeholder="+265991234567"
            leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
            error={!!errors.phoneNumber}
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

        {apiError && (
          <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{apiError}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-xs pt-1">
          <Link href="/register" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
            Create an Account
          </Link>
          <Link href="/forgot-password" className="text-slate-500 dark:text-slate-400 hover:underline">
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
