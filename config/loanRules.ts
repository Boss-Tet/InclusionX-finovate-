// =============================================================================
// config/loanRules.ts
// Owned by: Jabari (Financial Logic)
//
// Business rules for loan eligibility and repayment (FR-LOAN).
// Change these without touching controller code.
// =============================================================================

export const LOAN_RULES = {
  /**
   * Default maximum loan multiple.
   * A member may borrow up to this multiple of their savings balance.
   * Can be overridden per group via vsla_groups.loan_multiple_cap.
   */
  defaultLoanMultipleCap: 3.0,

  /**
   * Maximum allowed interest rate (as a percentage, e.g. 30 = 30%).
   * Reject group configs above this ceiling.
   */
  maxInterestRatePct: 30,

  /**
   * Grace period in days after due_date before a loan is auto-marked OVERDUE.
   * Set to 0 to mark immediately on the due date.
   */
  overdueGraceDays: 0,

  /**
   * Minimum loan principal in tambala (= 100 MWK).
   * Prevents dust loans that pollute the ledger.
   */
  minPrincipalTambala: 10_000, // 100 MWK

  /**
   * Required voter roles for loan approval.
   * All three must vote APPROVE for the loan to be disbursed.
   * A single REJECT from any of these roles immediately rejects the loan.
   */
  requiredVoterRoles: ['CHAIRPERSON', 'TREASURER', 'SECRETARY'] as const,
} as const;
