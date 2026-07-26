'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { HandCoins, Globe, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const LandingHeader = () => {
  const { user, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getDashboardRoute = () => {
    if (!user) return '/dashboard';
    if (user.platformRole === 'ADMIN') return '/admin/dashboard';
    if (user.platformRole === 'BANK_OFFICER') return '/bank-officer/dashboard';
    return '/dashboard'; // Default member router handles specific group roles
  };

  return (
    <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-12 lg:px-24 py-8 text-white z-50 w-full">
      <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
        <span className="inline-flex w-10 h-10 bg-emerald-500 rounded-full items-center justify-center shadow-lg">
          <HandCoins className="w-5 h-5 text-white" />
        </span>
        VSLA Connect
      </div>

      {/* Desktop Nav */}
      <div className="hidden lg:flex items-center gap-10 text-[13px] font-semibold tracking-wide">
        <Link href="#" className="text-white hover:text-emerald-400 transition-colors">Home</Link>
        <Link href="#features" className="text-white/80 hover:text-emerald-400 transition-colors">About Us</Link>
        <Link href="#services" className="text-white/80 hover:text-emerald-400 transition-colors">Services</Link>
        <Link href="#impact" className="text-white/80 hover:text-emerald-400 transition-colors">Impact</Link>
        <Link href="#news" className="text-white/80 hover:text-emerald-400 transition-colors">News</Link>
      </div>

      {/* Desktop CTA */}
      <div className="hidden lg:flex items-center gap-6 text-[13px] font-semibold">
        <span className="flex items-center gap-1.5 opacity-90">
          <Globe className="w-4 h-4" /> ENG
        </span>
        {!isLoading && (
          user ? (
            <Link href={getDashboardRoute()}>
              <Button variant="primary" className="rounded-full bg-emerald-500 hover:bg-emerald-400 border-none shadow-md px-8 py-2.5 text-zinc-950 font-bold">
                Dashboard
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-white hover:text-emerald-400 transition-colors">
                Login
              </Link>
              <Link href="/register">
                <Button variant="primary" className="rounded-full bg-emerald-500 hover:bg-emerald-400 border-none shadow-md px-6 py-2.5 text-zinc-950 font-bold">
                  Register
                </Button>
              </Link>
            </div>
          )
        )}
      </div>

      {/* Mobile Toggle */}
      <div className="lg:hidden z-50">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md text-zinc-900 shadow-xl flex flex-col p-6 gap-4 font-semibold text-sm lg:hidden border-b border-zinc-200">
          <Link href="#" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="#features" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link href="#impact" onClick={() => setIsMobileMenuOpen(false)}>Impact</Link>
          <Link href="#news" onClick={() => setIsMobileMenuOpen(false)}>News</Link>
          
          <div className="h-px bg-zinc-200 my-2"></div>
          
          {!isLoading && (
            user ? (
              <Link href={getDashboardRoute()} onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full border-zinc-300 py-3">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3">
                    Register
                  </Button>
                </Link>
              </div>
            )
          )}
        </div>
      )}
    </nav>
  );
};
