// =============================================================================
// controllers/ledger/handleGetLedger.ts
// Owned by: Jabari (Financial Logic)
// Accessible to: Treasurer, Chairperson, Secretary, Bank Officer, Admin
// =============================================================================

import { getLedgerByGroup } from '@/services/ledger/getLedgerByGroup';
import { GetLedgerQuery } from '@/lib/validations/ledger';
import { ApiResponse, PaginatedLedger } from '@/types/financial';

const ALLOWED_ROLES = ['TREASURER', 'CHAIRPERSON', 'SECRETARY', 'BANK_OFFICER', 'ADMIN'];

interface HandleGetLedgerArgs extends GetLedgerQuery {
  callerRole: string;
}

export async function handleGetLedger(
  args: HandleGetLedgerArgs
): Promise<ApiResponse<PaginatedLedger>> {
  const { callerRole, ...query } = args;

  if (!ALLOWED_ROLES.includes(callerRole)) {
    return { success: false, error: 'You do not have permission to view the ledger.', code: 'FORBIDDEN' };
  }

  const result = await getLedgerByGroup({
    groupId: query.groupId,
    from: query.from ? new Date(query.from) : undefined,
    to: query.to ? new Date(query.to) : undefined,
    entryType: query.entryType,
    page: query.page,
    pageSize: query.pageSize,
  });

  return { success: true, data: result };
}
