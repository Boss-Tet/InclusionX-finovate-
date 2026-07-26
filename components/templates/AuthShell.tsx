import React from 'react';
import Image from 'next/image';

export interface AuthShellProps {
  children: React.ReactNode;
  /** Which visual panel image/gradient to use */
  panel?: 'signup' | 'login' | 'forgot' | 'verify' | 'reset';
  testimonial?: {
    quote: string;
    name: string;
    role: string;
    activeSlide?: number; // 0-3
  };
}

/** Image used for each panel variant. signup/forgot/reset all share the group photo. */
const PANEL_IMAGE: Record<NonNullable<AuthShellProps['panel']>, string> = {
  login: '/auth-panel-login.png',
  signup: '/auth-panel-signup.png',
  forgot: '/auth-panel-signup.png',
  verify: '/auth-panel-verify.png',
  reset: '/auth-panel-verify.png',
};

/** Fallback tint colour shown while the image loads */
const PANEL_TINT: Record<NonNullable<AuthShellProps['panel']>, string> = {
  login: '#2a4a38',
  signup: '#2f4a3b',
  forgot: '#33564a',
  verify: '#3d5c4a',
  reset: '#1f4436',
};

const DEFAULT_TESTIMONIAL: NonNullable<AuthShellProps['testimonial']> = {
  quote:
    '"VSLA Connect changed how our group manages savings. Everything is transparent and trusted by our bank."',
  name: 'Chifundo Banda',
  role: 'VSLA Chairperson',
  activeSlide: 0,
};

export const AuthShell: React.FC<AuthShellProps> = ({
  children,
  panel = 'login',
  testimonial = DEFAULT_TESTIMONIAL,
}) => {
  const imgSrc = PANEL_IMAGE[panel];
  const tint = PANEL_TINT[panel];
  const active = testimonial.activeSlide ?? 0;

  return (
    <div
      style={{ fontFamily: "'Inter', -apple-system, 'Segoe UI', Roboto, Arial, sans-serif" }}
      className="flex min-h-screen bg-white"
    >
      {/* ============ LEFT: FORM PANEL ============ */}
      <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-10 md:px-14">
        <div className="w-full max-w-[400px]">
          {/* Brand */}
          <div className="mb-8 flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[9px] font-extrabold text-white"
              style={{ background: '#2E7D46', fontSize: 15 }}
            >
              V
            </div>
            <span className="text-[18px] font-extrabold" style={{ color: '#151A17' }}>
              VSLA<span style={{ color: '#2E7D46' }}>.</span>Connect
            </span>
          </div>

          {/* Page content (title + form) */}
          {children}
        </div>
      </div>

      {/* ============ RIGHT: VISUAL PANEL (hidden on mobile) ============ */}
      <div className="hidden flex-1 p-5 pl-0 md:flex">
        <div
          className="relative flex-1 overflow-hidden rounded-[26px]"
          style={{ background: tint }}
        >
          {/* Full-bleed photo */}
          <Image
            src={imgSrc}
            alt="VSLA women savings group"
            fill
            className="object-cover object-center"
            priority
            sizes="50vw"
          />

          {/* Dark gradient scrim — bottom 44% so testimonial is readable */}
          <div
            className="absolute inset-x-0 bottom-0 z-10"
            style={{
              height: '55%',
              background:
                'linear-gradient(180deg, rgba(10,15,12,0) 0%, rgba(8,12,10,0.88) 100%)',
            }}
          />

          {/* Testimonial */}
          <div className="absolute bottom-[46px] left-6 right-6 z-20 text-white">
            <p
              className="mb-3.5 leading-relaxed"
              style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.92)' }}
            >
              {testimonial.quote}
            </p>
            <div className="text-sm font-bold">{testimonial.name}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
              {testimonial.role}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-[18px] left-6 right-6 z-20 flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="h-1 flex-1 rounded-full"
                style={{
                  background: i === active ? '#E3B341' : 'rgba(255,255,255,0.35)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
