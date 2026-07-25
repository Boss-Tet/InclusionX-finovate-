// controllers/auth/handleLogout.ts
// POST /api/auth/logout
// Revokes the caller's current session. JWT is deleted from httpOnly cookie by the route.

import { revokeSession } from '@/services/auth/revokeSession';
import { ApiResponse } from '@/types/financial';

export async function handleLogout(
  sessionId: string
): Promise<ApiResponse<{ message: string }>> {
  await revokeSession(sessionId);
  return { success: true, data: { message: 'Logged out successfully.' } };
}
