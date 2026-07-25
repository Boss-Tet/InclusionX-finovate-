// =============================================================================
// controllers/savings/handleGetBalance.ts
// Owned by: Jabari (Financial Logic)
// =============================================================================

import { getMemberBalance } from '@/services/savings/getMemberBalance';
import { ApiResponse, MemberBalanceSummary } from '@/types/financial';

interface HandleGetBalanceArgs {
  memberId: string;
  groupId: string;
}

export async function handleGetBalance(
  args: HandleGetBalanceArgs
): Promise<ApiResponse<MemberBalanceSummary>> {
  const balance = await getMemberBalance(args.memberId, args.groupId);
  return { success: true, data: balance };
}
