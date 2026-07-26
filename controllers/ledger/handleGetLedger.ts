// =============================================================================
// controllers/ledger/handleGetLedger.ts
// Owned by: Jabari (Financial Logic)
//
// TWO separate role checks — do NOT conflate them:
//   GroupRole  (GroupMember.roleInGroup) → TREASURER, CHAIRPERSON, SECRETARY
//   PlatformRole (User.platformRole)     → BANK_OFFICER, ADMIN
//
// Either a group officer OR a platform-level officer may view the ledger.
// =============================================================================

import { getLedgerByGroup } from '@/services/ledger/getLedgerByGroup';
import { GetLedgerQuery } from '@/lib/validations/ledger';
import { ApiResponse, PaginatedLedger } from '@/types/financial';

// Roles that may view the ledger — kept as two distinct sets.
const GROUP_ROLES_ALLOWED = ['TREASURER', 'CHAIRPERSON', 'SECRETARY'] as const;
const PLATFORM_ROLES_ALLOWED = ['BANK_OFFICER', 'ADMIN'] as const;

type HandleGetLedgerArgs = GetLedgerQuery & {
  /** GroupMember.roleInGroup — one of GroupRole */
  callerGroupRole: string;
  /** User.platformRole — one of PlatformRole */
  callerPlatformRole: string;
};

export async function handleGetLedger(
  args: HandleGetLedgerArgs
): Promise<ApiResponse<PaginatedLedger>> {
  const { callerGroupRole, callerPlatformRole, ...query } = args;

  const hasGroupAccess = (GROUP_ROLES_ALLOWED as readonly string[]).includes(callerGroupRole);
  const hasPlatformAccess = (PLATFORM_ROLES_ALLOWED as readonly string[]).includes(callerPlatformRole);

  if (!hasGroupAccess && !hasPlatformAccess) {
    return {
      success: false,
      error: 'You do not have permission to view the ledger.',
      code: 'FORBIDDEN',
    };
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

