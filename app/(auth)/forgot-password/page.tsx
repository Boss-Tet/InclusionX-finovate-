'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { AuthShell } from '@/components/templates/AuthShell';

/* ─── Validation ───────────────────────────────────────────────── */
const requestSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});
type RequestFormData = z.infer<typeof requestSchema>;

const resetSchema = z.object({
  newPassword: z.string().min(8, 'Password must be at least 8 characters').max(72),
  confirmPassword: z.string().min(8),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword'],
});
type ResetFormData = z.infer<typeof resetSchema>;

/* ─── Design tokens ────────────────────────────────────────────── */
const inkColor = '#151A17';
const inkSoft = '#6B7280';
const inkFaint = '#9CA3AF';
const lineColor = '#E4E7E5';
const brandGreen = '#2E7D46';
const btnGreen = '#1E3D28';

const inputBase =
  'w-full rounded-[10px] border px-3.5 py-3 text-[13.5px] outline-none transition-shadow';
const inputStyle: React.CSSProperties = {
  borderColor: lineColor,
  color: inkColor,
  fontFamily: 'inherit',
};

/* ─── Helpers ──────────────────────────────────────────────────── */
function EyeIcon({ off = false }: { off?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M3 3l18 18" strokeWidth="1.6" />}
    </svg>
  );
}

function TextField({
  id, label, type = 'text', placeholder, registration, error,
}: {
  id: string; label: string; type?: string; placeholder: string;
  registration: React.InputHTMLAttributes<HTMLInputElement>; error?: string;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold" style={{ color: inkColor }}>
        {label} *
      </label>
      <input
        {...registration} id={id} type={type} placeholder={placeholder}
        className={inputBase}
        style={{ ...inputStyle, borderColor: error ? '#EF4444' : lineColor }}
        onFocus={(e) => { e.currentTarget.style.borderColor = brandGreen; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(46,125,70,0.12)'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = error ? '#EF4444' : lineColor; e.currentTarget.style.boxShadow = 'none'; }}
      />
      {error && <p className="mt-1 text-[12px]" style={{ color: '#EF4444' }}>{error}</p>}
    </div>
  );
}

function PasswordField({
  id, label, placeholder, registration, error,
}: {
  id: string; label: string; placeholder: string;
  registration: React.InputHTMLAttributes<HTMLInputElement>; error?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold" style={{ color: inkColor }}>
        {label} *
      </label>
      <div className="relative">
        <input
          {...registration} id={id} type={show ? 'text' : 'password'} placeholder={placeholder}
          className={`${inputBase} pr-10`}
          style={{ ...inputStyle, borderColor: error ? '#EF4444' : lineColor }}
          onFocus={(e) => { e.currentTarget.style.borderColor = brandGreen; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(46,125,70,0.12)'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = error ? '#EF4444' : lineColor; e.currentTarget.style.boxShadow = 'none'; }}
        />
        <button type="button" onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: inkFaint }}>
          <EyeIcon off={!show} />
        </button>
      </div>
      {error && <p className="mt-1 text-[12px]" style={{ color: '#EF4444' }}>{error}</p>}
    </div>
  );
}

function PrimaryButton({ children, loading }: { children: React.ReactNode; loading?: boolean }) {
  return (
    <button type="submit" disabled={loading}
      className="mt-2 w-full rounded-full py-3.5 text-[14px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      style={{ background: btnGreen, fontFamily: 'inherit', border: 'none' }}>
      {loading ? 'Please wait…' : children}
    </button>
  );
}

function ApiErrorBanner({ message }: { message: string }) {
  return (
    <div className="mb-3 flex items-start gap-2 rounded-[10px] px-3.5 py-2.5 text-[12.5px]"
      style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}>
      <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
      </svg>
      {message}
    </div>
  );
}

/* ─── 6-box OTP Input ──────────────────────────────────────────── */
function OtpInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = (value + '      ').slice(0, 6).split('');

  const handleChange = (i: number, ch: string) => {
    const d = ch.replace(/\D/g, '').slice(-1);
    const arr = [...digits];
    arr[i] = d;
    onChange(arr.join('').trimEnd());
    if (d && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i].trim() && i > 0) refs.current[i - 1]?.focus();
  };

  return (
    <div className="mb-6 flex gap-2.5">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          type="text" inputMode="numeric" maxLength={1}
          value={d.trim()} placeholder="–"
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="h-[52px] w-12 rounded-[12px] border text-center text-[18px] font-bold outline-none transition-shadow"
          style={{
            borderWidth: '1.5px',
            borderColor: d.trim() ? brandGreen : lineColor,
            color: d.trim() ? inkColor : inkFaint,
            fontFamily: 'inherit',
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = brandGreen; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(46,125,70,0.12)'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = d.trim() ? brandGreen : lineColor; e.currentTarget.style.boxShadow = 'none'; }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  FORGOT PASSWORD PAGE                                            */
/* ═══════════════════════════════════════════════════════════════ */
export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<'request' | 'verify' | 'reset' | 'done'>('request');
  const [userEmail, setUserEmail] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [submittingOtp, setSubmittingOtp] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  /* ── Step 1: Request ── */
  const {
    register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: { email: '' },
  });

  /* ── Step 3: Reset ── */
  const {
    register: registerReset, handleSubmit: handleSubmitReset,
    formState: { errors: errorsReset, isSubmitting: isSubmittingReset },
  } = useForm<ResetFormData>({ resolver: zodResolver(resetSchema) });

  const onRequest = async (data: RequestFormData) => {
    setApiError(null);
    try {
      const res = await fetch('/api/auth/password-reset/request', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });
      const json = await res.json();
      if (!json.success && res.status === 500) {
        setApiError('Server error. Please try again later.'); return;
      }
      setUserEmail(data.email);
      setStep('verify');
    } catch { setApiError('Network error. Please check your connection.'); }
  };

  const onVerifyOtp = async () => {
    setOtpError(null);
    if (otpValue.trim().length < 6) { setOtpError('Enter all 6 digits.'); return; }
    // We don't verify the OTP here — we pass it alongside the new password
    // in the final step so the server can validate atomically.
    setStep('reset');
  };

  const onReset = async (data: ResetFormData) => {
    setApiError(null);
    try {
      const res = await fetch('/api/auth/password-reset/verify', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, otp: otpValue, newPassword: data.newPassword }),
      });
      const json = await res.json();
      if (!json.success) {
        setApiError(typeof json.error === 'string' ? json.error : 'Invalid OTP or code expired.');
        setStep('verify'); return;
      }
      setStep('done');
      setTimeout(() => router.push('/login'), 2000);
    } catch { setApiError('Network error. Please check your connection.'); }
  };

  /* ── Done ── */
  if (step === 'done') {
    return (
      <AuthShell panel="reset">
        <div className="py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: 'rgba(46,125,70,0.12)' }}>
            <svg className="h-8 w-8" fill="none" stroke={brandGreen} strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="mb-2 text-[20px] font-extrabold" style={{ color: inkColor }}>Password Updated!</h2>
          <p className="text-[13.5px]" style={{ color: inkSoft }}>Redirecting to sign in…</p>
        </div>
      </AuthShell>
    );
  }

  /* ── Step 3: Set New Password ── */
  if (step === 'reset') {
    return (
      <AuthShell panel="reset">
        <h1 className="mb-1.5 text-[25px] font-extrabold" style={{ color: inkColor }}>Set New Password</h1>
        <p className="mb-6 text-[13.5px] leading-relaxed" style={{ color: inkSoft }}>
          Must be at least 8 characters.
        </p>

        <form onSubmit={handleSubmitReset(onReset)}>
          <PasswordField id="newPassword" label="Password" placeholder="Enter Password"
            registration={registerReset('newPassword')} error={errorsReset.newPassword?.message} />

          <PasswordField id="confirmPassword" label="Confirm Password" placeholder="Enter Password"
            registration={registerReset('confirmPassword')} error={errorsReset.confirmPassword?.message} />

          {apiError && <ApiErrorBanner message={apiError} />}

          <PrimaryButton loading={isSubmittingReset}>Reset Password</PrimaryButton>
        </form>
      </AuthShell>
    );
  }

  /* ── Step 2: Verify Code ── */
  if (step === 'verify') {
    return (
      <AuthShell panel="verify">
        <h1 className="mb-1.5 text-[25px] font-extrabold" style={{ color: inkColor }}>Verify Code</h1>
        <p className="mb-6 text-[13.5px] leading-relaxed" style={{ color: inkSoft }}>
          Please enter the 6-digit code we just sent to{' '}
          <strong style={{ color: inkColor, fontWeight: 700 }}>{userEmail}</strong>
        </p>

        <p className="mb-2.5 text-[13px] font-semibold" style={{ color: inkColor }}>Code *</p>
        <OtpInput value={otpValue} onChange={setOtpValue} />

        {otpError && <ApiErrorBanner message={otpError} />}
        {apiError && <ApiErrorBanner message={apiError} />}

        <button type="button" onClick={onVerifyOtp} disabled={submittingOtp}
          className="mt-1 w-full rounded-full py-3.5 text-[14px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: btnGreen, fontFamily: 'inherit', border: 'none' }}>
          {submittingOtp ? 'Verifying…' : 'Verify'}
        </button>

        <p className="mt-5 text-center text-[13px]" style={{ color: inkSoft }}>
          Didn&apos;t receive the email?{' '}
          <button type="button" onClick={() => { setStep('request'); setOtpValue(''); setOtpError(null); setApiError(null); }}
            className="font-bold underline" style={{ color: brandGreen }}>
            Resend Code
          </button>
        </p>
      </AuthShell>
    );
  }

  /* ── Step 1: Forgot Password ── */
  return (
    <AuthShell panel="forgot">
      <h1 className="mb-1.5 text-[25px] font-extrabold" style={{ color: inkColor }}>Forgot Password?</h1>
      <p className="mb-6 text-[13.5px] leading-relaxed" style={{ color: inkSoft }}>
        Don&apos;t worry, we&apos;ll send a reset code to your email address.
      </p>

      <form onSubmit={handleSubmit(onRequest)}>
        <TextField id="email" label="Email Address" type="email" placeholder="chifundo@example.com"
          registration={register('email')} error={errors.email?.message} />

        {apiError && <ApiErrorBanner message={apiError} />}

        <PrimaryButton loading={isSubmitting}>Submit</PrimaryButton>
      </form>

      <p className="mt-5 text-center text-[13px]" style={{ color: inkSoft }}>
        Remember password?{' '}
        <Link href="/login" className="font-bold underline" style={{ color: brandGreen }}>
          Sign In
        </Link>
      </p>
    </AuthShell>
  );
}
