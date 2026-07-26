import React from 'react';
import { Landmark } from 'lucide-react';

export interface AuthShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthShell: React.FC<AuthShellProps> = ({
  children,
  title = 'VSLA Connect',
  subtitle = 'Community Financial Inclusion & Digital Savings Ledger',
}) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-xl shadow-emerald-500/20 mb-2">
            <Landmark className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/80 max-w-xs mx-auto">
            {subtitle}
          </p>
        </div>
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20 dark:border-slate-800">
          {children}
        </div>
        <p className="text-center text-xs text-slate-400">
          Powered by VSLA Finovate Malawi • Inclusive Community Banking
        </p>
      </div>
    </div>
  );
};
