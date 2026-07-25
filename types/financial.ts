// =============================================================================
// types/financial.ts
// Owned by: Jabari (Financial Logic)
//
// Shared TypeScript interfaces for financial entities.
// Imported by both frontend hooks and backend controllers.
// All money fields are in tambala (integer) unless suffixed with _mwk.
// =============================================================================

// ---------------------------------------------------------------------------
// Generic API response envelope
// ---------------------------------------------------------------------------

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: string;
  code?: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ---------------------------------------------------------------------------
// Savings / Contributions
// ---------------------------------------------------------------------------

export interface ContributionRecord {
  id: string;
  groupId: string;
  memberId: string;
  amountTambala: number;
  method: 'CASH' | 'MOBILE_MONEY' | 'CARD';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  cyclePeriod: string | null; // "YYYY-MM"
  recordedById: string | null;
  approvedById: string | null;
  createdAt: Date;
}

export interface MemberBalanceSummary {
  memberId: string;
  groupId: string;
  totalContributedTambala: number;
  approvedContributions: number;
  pendingContributions: number;
}

// ---------------------------------------------------------------------------
// Loans
// ---------------------------------------------------------------------------

export type LoanStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'DISBURSED'
  | 'REPAYING'
  | 'REPAID'
  | 'OVERDUE';

export interface LoanRecord {
  id: string;
  groupId: string;
  memberId: string;
  principalTambala: number;
  interestRate: number;
  totalDueTambala: number | null;
  amountRepaidTambala: number;
  status: LoanStatus;
  rejectionReason: string | null;
  requestedAt: Date;
  approvedAt: Date | null;
  disbursedAt: Date | null;
  dueDate: Date | null;
  repaidAt: Date | null;
}

export interface LoanVoteRecord {
  id: string;
  loanId: string;
  voterId: string;
  decision: 'APPROVE' | 'REJECT';
  note: string | null;
  votedAt: Date;
}

export interface LoanWithVotes extends LoanRecord {
  votes: LoanVoteRecord[];
  remainingDueTambala: number;
}

export interface RepaymentRecord {
  id: string;
  loanId: string;
  amountTambala: number;
  method: 'CASH' | 'MOBILE_MONEY' | 'CARD';
  paidAt: Date;
}

// ---------------------------------------------------------------------------
// Withdrawals
// ---------------------------------------------------------------------------

export type WithdrawalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID_OUT';

export interface WithdrawalRequestRecord {
  id: string;
  groupId: string;
  memberId: string;
  amountTambala: number;
  reason: string;
  status: WithdrawalStatus;
  createdAt: Date;
}

export interface WithdrawalVoteRecord {
  id: string;
  requestId: string;
  voterId: string;
  decision: 'APPROVE' | 'REJECT';
  note: string | null;
  votedAt: Date;
}

export interface WithdrawalWithVotes extends WithdrawalRequestRecord {
  votes: WithdrawalVoteRecord[];
  approveCount: number;
  rejectCount: number;
  quorumNeeded: number;
}

// ---------------------------------------------------------------------------
// Ledger
// ---------------------------------------------------------------------------

export type LedgerEntryType =
  | 'CONTRIBUTION'
  | 'LOAN_DISBURSEMENT'
  | 'LOAN_REPAYMENT'
  | 'WITHDRAWAL'
  | 'REVERSAL'
  | 'MEMBER_SUSPENDED'
  | 'MEMBER_REMOVED';

export type LedgerDirection = 'CREDIT' | 'DEBIT';

export interface LedgerEntryRecord {
  id: string;
  groupId: string;
  entryType: LedgerEntryType;
  referenceId: string;
  amountTambala: number;
  direction: LedgerDirection;
  balanceAfter: number | null;
  reversalOfId: string | null;
  reason: string | null;
  createdAt: Date;
}

export interface PaginatedLedger {
  entries: LedgerEntryRecord[];
  total: number;
  page: number;
  pageSize: number;
}

// ---------------------------------------------------------------------------
// Health Score
// ---------------------------------------------------------------------------

export interface HealthScoreBreakdown {
  score: number;               // 0–100 composite
  savingsComponent: number;    // 0–35
  repaymentComponent: number;  // 0–35
  attendanceComponent: number; // 0–20
  governanceComponent: number; // 0–10
  computedAt: Date;
}

export interface GroupHealthSummary {
  groupId: string;
  groupName: string;
  memberCount: number;
  latestScore: HealthScoreBreakdown | null;
}
