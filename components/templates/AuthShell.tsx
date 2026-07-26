import React from 'react';

export interface AuthShellProps {
  children: React.ReactNode;
  /** Which visual panel gradient variant to use */
  panel?: 'signup' | 'login' | 'forgot' | 'verify' | 'reset';
  testimonial?: {
    quote: string;
    name: string;
    role: string;
    activeSlide?: number; // 0-3
  };
}

const PANEL_BG: Record<NonNullable<AuthShellProps['panel']>, string> = {
  signup:
    'radial-gradient(ellipse 60% 40% at 75% 15%, rgba(255,236,190,0.25), transparent 60%), linear-gradient(180deg, #2f4a3b 0%, #3a5c48 45%, #2a4738 100%)',
  login:
    'radial-gradient(ellipse 55% 40% at 30% 10%, rgba(255,240,200,0.2), transparent 60%), linear-gradient(180deg, #1e3d2f 0%, #2d5a44 50%, #23483a 100%)',
  forgot:
    'radial-gradient(ellipse 45% 30% at 50% 5%, rgba(255,232,190,0.5), transparent 65%), linear-gradient(180deg, #33564a 0%, #3d6152 50%, #2f4f43 100%)',
  verify:
    'radial-gradient(ellipse 55% 45% at 70% 20%, rgba(255,247,214,0.45), transparent 60%), linear-gradient(180deg, #cdd9ba 0%, #a9bf9a 40%, #7f9a80 75%, #5c7864 100%)',
  reset:
    'radial-gradient(ellipse 50% 30% at 25% 85%, rgba(255,230,180,0.18), transparent 60%), linear-gradient(180deg, #1f4436 0%, #2b5a45 45%, #d8cdb6 46%, #cfc3a8 100%)',
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
  const bg = PANEL_BG[panel];
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
          style={{ background: bg }}
        >
          {/* Bottom scrim */}
          <div
            className="absolute inset-x-0 bottom-0 h-[44%]"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,15,12,0) 0%, rgba(8,12,10,0.82) 100%)',
            }}
          />

          {/* Testimonial */}
          <div className="absolute bottom-[46px] left-6 right-6 text-white">
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
          <div className="absolute bottom-[18px] left-6 right-6 flex gap-1.5">
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
