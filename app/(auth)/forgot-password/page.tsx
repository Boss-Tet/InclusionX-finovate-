'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AuthShell } from '@/components/templates/AuthShell';
import { FormField } from '@/components/molecules/FormField';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Mail, KeyRound, ArrowLeft } from 'lucide-react';

const forgotSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = (data: ForgotFormData) => {
    setSubmitted(true);
  };

  return (
    <AuthShell subtitle="Password Recovery for VSLA Members">
      {submitted ? (
        <div className="text-center space-y-4 py-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
            <KeyRound className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Reset Link Sent!
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            We have sent password recovery instructions and an SMS OTP code to your registered details.
          </p>
          <Button variant="outline" size="md" className="w-full">
            <Link href="/login" className="w-full flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
            </Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="text-center pb-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Forgot Password
            </h2>
            <p className="text-xs text-slate-500">
              Enter your account email to receive a recovery link
            </p>
          </div>

          <FormField label="Email Address" error={errors.email?.message} required>
            <Input
              {...register('email')}
              placeholder="name@vslaconnect.mw"
              leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
            />
          </FormField>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2"
            isLoading={isSubmitting}
            leftIcon={<KeyRound className="w-5 h-5" />}
          >
            Send Recovery Link
          </Button>

          <p className="text-center text-xs text-slate-500 pt-2">
            Remembered password?{' '}
            <Link
              href="/login"
              className="text-emerald-600 font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      )}
    </AuthShell>
  );
}
