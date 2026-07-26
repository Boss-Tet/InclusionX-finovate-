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
import { Phone, KeyRound, ArrowLeft, Lock, AlertCircle, ShieldCheck } from 'lucide-react';

// Step 1: request OTP — maps to RequestPasswordResetSchema { phoneNumber }
const requestSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\+\d{7,15}$/, 'Enter phone in E.164 format, e.g. +265991234567'),
});
type RequestFormData = z.infer<typeof requestSchema>;

// Step 2: verify OTP + set new password — maps to ResetPasswordSchema
const resetSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 digits').regex(/^\d{6}$/),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password is too long'),
});
type ResetFormData = z.infer<typeof resetSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<'request' | 'reset' | 'done'>('request');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: { phoneNumber: '+265' },
  });

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: errorsReset, isSubmitting: isSubmittingReset },
  } = useForm<ResetFormData>({ resolver: zodResolver(resetSchema) });

  const onRequest = async (data: RequestFormData) => {
    setApiError(null);
    try {
      const res = await fetch('/api/auth/password-reset/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: data.phoneNumber }),
      });
      const json = await res.json();
      // API always returns 200 to prevent enumeration — we advance regardless.
      if (!json.success) {
        // Only surface server errors, not "phone not found" (anti-enumeration).
        if (res.status === 500) {
          setApiError('Server error. Please try again later.');
          return;
        }
      }
      setPhoneNumber(data.phoneNumber);
      setStep('reset');
    } catch {
      setApiError('Network error. Please check your connection.');
    }
  };

  const onReset = async (data: ResetFormData) => {
    setApiError(null);
    try {
      const res = await fetch('/api/auth/password-reset/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp: data.otp, newPassword: data.newPassword }),
      });
      const json = await res.json();
      if (!json.success) {
        const msg = typeof json.error === 'string' ? json.error : 'Invalid OTP or code expired.';
        setApiError(msg);
        return;
      }
      setStep('done');
      setTimeout(() => router.push('/login'), 2000);
    } catch {
      setApiError('Network error. Please check your connection.');
    }
  };

  if (step === 'done') {
    return (
      <AuthShell subtitle="Password Reset Successful">
        <div className="text-center space-y-4 py-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Password Updated!
          </h2>
          <p className="text-sm text-slate-500">Redirecting to sign in…</p>
        </div>
      </AuthShell>
    );
  }

  if (step === 'reset') {
    return (
      <AuthShell subtitle="Set Your New Password">
        <form onSubmit={handleSubmitReset(onReset)} className="space-y-4">
          <div className="text-center pb-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Reset Password
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Enter the OTP sent to <span className="font-semibold text-slate-700 dark:text-slate-300">{phoneNumber}</span> and your new password
            </p>
          </div>

          <FormField label="OTP Code" error={errorsReset.otp?.message} required>
            <Input
              {...registerReset('otp')}
              placeholder="000000"
              maxLength={6}
              className="text-center text-2xl tracking-widest font-mono"
            />
          </FormField>

          <FormField label="New Password" error={errorsReset.newPassword?.message} required>
            <Input
              {...registerReset('newPassword')}
              type="password"
              placeholder="At least 8 characters"
              leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
              error={!!errorsReset.newPassword}
            />
          </FormField>

          {apiError && (
            <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{apiError}</span>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isSubmittingReset}
            leftIcon={<KeyRound className="w-5 h-5" />}
          >
            Reset Password
          </Button>

          <button
            type="button"
            onClick={() => { setStep('request'); setApiError(null); }}
            className="text-xs text-slate-500 underline w-full text-center flex items-center justify-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell subtitle="Password Recovery for VSLA Members">
      <form onSubmit={handleSubmit(onRequest)} className="space-y-4">
        <div className="text-center pb-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Forgot Password
          </h2>
          <p className="text-xs text-slate-500">
            Enter your registered phone number to receive an SMS OTP
          </p>
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

        {apiError && (
          <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{apiError}</span>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isSubmitting}
          leftIcon={<KeyRound className="w-5 h-5" />}
        >
          Send Recovery OTP
        </Button>

        <p className="text-center text-xs text-slate-500 pt-2">
          Remembered password?{' '}
          <Link href="/login" className="text-emerald-600 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
