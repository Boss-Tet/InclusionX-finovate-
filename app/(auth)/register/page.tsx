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
import { User, Phone, Lock, UserPlus, AlertCircle, ShieldCheck } from 'lucide-react';
import { ApiError } from '@/lib/api/client';

// Step 1: registration details — maps to backend RegisterSchema
const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(255),
  phoneNumber: z
    .string()
    .regex(/^\+\d{7,15}$/, 'Enter phone in E.164 format, e.g. +265991234567'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password is too long'),
  preferredLang: z.enum(['en', 'ny']),
});
type RegisterFormData = z.infer<typeof registerSchema>;

// Step 2: OTP verification — maps to backend VerifyPhoneSchema
const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 digits').regex(/^\d{6}$/, 'OTP must be digits only'),
});
type OtpFormData = z.infer<typeof otpSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<'details' | 'otp' | 'done'>('details');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', phoneNumber: '+265', password: '', preferredLang: 'en' as const },
  });

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: errorsOtp, isSubmitting: isSubmittingOtp },
  } = useForm<OtpFormData>({ resolver: zodResolver(otpSchema) });

  const onRegister = async (data: RegisterFormData) => {
    setApiError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!json.success) {
        const msg = typeof json.error === 'string' ? json.error : 'Registration failed.';
        setApiError(msg);
        return;
      }
      // SMS OTP sent — advance to verification step.
      setPhoneNumber(data.phoneNumber);
      setStep('otp');
    } catch {
      setApiError('Network error. Please check your connection.');
    }
  };

  const onVerifyOtp = async (data: OtpFormData) => {
    setApiError(null);
    try {
      const res = await fetch('/api/auth/verify-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp: data.otp }),
      });
      const json = await res.json();
      if (!json.success) {
        const msg = typeof json.error === 'string' ? json.error : 'Invalid OTP.';
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
      <AuthShell subtitle="Account Verified">
        <div className="text-center space-y-4 py-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Phone Verified!
          </h2>
          <p className="text-sm text-slate-500">
            Your account is ready. Redirecting to sign in…
          </p>
        </div>
      </AuthShell>
    );
  }

  if (step === 'otp') {
    return (
      <AuthShell subtitle="Verify Your Phone Number">
        <form onSubmit={handleSubmitOtp(onVerifyOtp)} className="space-y-4">
          <div className="text-center pb-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Enter Your OTP
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              We sent a 6-digit code to <span className="font-semibold text-slate-700 dark:text-slate-300">{phoneNumber}</span>
            </p>
          </div>

          <FormField label="Verification Code" error={errorsOtp.otp?.message} required>
            <Input
              {...registerOtp('otp')}
              placeholder="000000"
              maxLength={6}
              className="text-center text-2xl tracking-widest font-mono"
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
            isLoading={isSubmittingOtp}
          >
            Verify Phone
          </Button>

          <button
            type="button"
            onClick={() => { setStep('details'); setApiError(null); }}
            className="text-xs text-slate-500 underline w-full text-center"
          >
            ← Back
          </button>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell subtitle="Join a Village Savings & Loan Association digitally">
      <form onSubmit={handleSubmit(onRegister)} className="space-y-3">
        <div className="text-center pb-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Create Your Account
          </h2>
          <p className="text-xs text-slate-500">
            Fill in your details to receive an SMS verification code
          </p>
        </div>

        <FormField label="Full Name" error={errors.fullName?.message} required>
          <Input
            {...register('fullName')}
            placeholder="Chifundo Banda"
            leftIcon={<User className="w-4 h-4 text-slate-400" />}
            error={!!errors.fullName}
          />
        </FormField>

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
            placeholder="At least 8 characters"
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

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isSubmitting}
          leftIcon={<UserPlus className="w-5 h-5" />}
        >
          Create Account & Send OTP
        </Button>

        <p className="text-center text-xs text-slate-500 pt-2">
          Already registered?{' '}
          <Link href="/login" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
            Sign In Here
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
