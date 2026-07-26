'use client';

/**
 * hooks/useAuth.ts
 *
 * Replaces mock-based implementation with real API calls.
 *
 * - fetchCurrentSession → GET /api/auth/me (reads httpOnly vsla_token cookie)
 * - login              → POST /api/auth/login
 * - logout             → POST /api/auth/logout
 * - register           → POST /api/auth/register
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchCurrentSession, roleToDashboardPath, type SessionUser } from '@/lib/auth/session';
import { ApiError } from '@/lib/api/client';

export type { SessionUser };

interface AuthState {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // On mount, check if there's an active session.
  useEffect(() => {
    fetchCurrentSession().then((user) => {
      setState({
        user,
        isAuthenticated: !!user && user.type === 'session',
        isLoading: false,
        error: null,
      });
    });
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<{ requires2fa: boolean }> => {
      setState((s) => ({ ...s, isLoading: true, error: null }));
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const json = await res.json();

        if (!json.success) {
          const msg =
            typeof json.error === 'string' ? json.error : 'Login failed. Please try again.';
          setState((s) => ({ ...s, isLoading: false, error: msg }));
          throw new ApiError(res.status, json.code ?? 'UNKNOWN', msg);
        }

        const requires2fa: boolean = json.data.requires2fa ?? false;

        if (!requires2fa) {
          // Full session issued — re-fetch /api/auth/me to populate user state.
          const user = await fetchCurrentSession();
          setState({ user, isAuthenticated: !!user, isLoading: false, error: null });
        } else {
          // Pending 2FA — cookie is short-lived pending_2fa token.
          setState((s) => ({ ...s, isLoading: false }));
        }

        return { requires2fa };
      } catch (err) {
        if (err instanceof ApiError) throw err;
        const msg = 'Network error. Please check your connection.';
        setState((s) => ({ ...s, isLoading: false, error: msg }));
        throw new ApiError(0, 'NETWORK', msg);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setState((s) => ({ ...s, isLoading: true }));
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Proceed even if request fails — cookie will be cleared server-side.
    }
    setState({ user: null, isAuthenticated: false, isLoading: false, error: null });
    window.location.href = '/login';
  }, []);

  const clearError = useCallback(() => {
    setState((s) => ({ ...s, error: null }));
  }, []);

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    logout,
    clearError,
    /** Convenience: the role-specific dashboard path for the current user */
    dashboardPath: state.user ? roleToDashboardPath(state.user.platformRole) : '/login',
  };
}
