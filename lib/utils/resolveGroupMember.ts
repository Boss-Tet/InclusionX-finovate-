// =============================================================================
// lib/utils/resolveGroupMember.ts
// Owned by: Jabari (helping Orama)
//
// Called at the top of group-scoped API route handlers to look up the
// GroupMember record for the current user + active group, then return
// the two group-specific headers that financial controllers require:
//
//   callerGroupRole  → GroupMember.roleInGroup
//   callerMemberId   → GroupMember.id
//
// The middleware cannot do this lookup (Prisma = Node.js only), so each
// route handler calls this function after the middleware has injected
// x-caller-user-id and x-active-group-id.
// =============================================================================

import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface GroupMemberContext {
  callerUserId: string;
  callerGroupRole: string;
  callerMemberId: string;
  activeGroupId: string;
}

interface ResolveFailure {
  error: NextResponse;
}

/**
 * Resolves the caller's GroupMember context from request headers.
 * Returns a `ResolveFailure` (with a ready-to-return 403 response) if
 * the user is not an active member of the specified group.
 */
export async function resolveGroupMember(
  req: NextRequest
): Promise<GroupMemberContext | ResolveFailure> {
  const callerUserId = req.headers.get('x-caller-user-id') ?? '';
  const activeGroupId = req.headers.get('x-active-group-id') ?? '';

  if (!callerUserId || !activeGroupId) {
    return {
      error: NextResponse.json(
        { success: false, error: 'Missing x-caller-user-id or x-active-group-id header.', code: 'BAD_REQUEST' },
        { status: 400 }
      ),
    };
  }

  const member = await db.groupMember.findFirst({
    where: { userId: callerUserId, groupId: activeGroupId, status: 'ACTIVE' },
    select: { id: true, roleInGroup: true },
  });

  if (!member) {
    return {
      error: NextResponse.json(
        { success: false, error: 'You are not an active member of this group.', code: 'FORBIDDEN' },
        { status: 403 }
      ),
    };
  }

  return {
    callerUserId,
    callerGroupRole: member.roleInGroup,
    callerMemberId: member.id,
    activeGroupId,
  };
}

/** Type guard to check if the result is a failure. */
export function isResolveFailure(
  result: GroupMemberContext | ResolveFailure
): result is ResolveFailure {
  return 'error' in result;
}
