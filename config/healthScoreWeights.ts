// =============================================================================
// config/healthScoreWeights.ts
// Owned by: Jabari (Financial Logic)
//
// Centralised weight config for the Group Health Score engine (FR-BANK.2).
// Tweak these numbers without touching any controller or service code.
// All weights must sum to exactly 1.0.
// =============================================================================

export const HEALTH_SCORE_WEIGHTS = {
  /** Savings consistency — did every member contribute every cycle? */
  savings: 0.35,
  /** Loan repayment rate — how many loans were repaid on time? */
  repayment: 0.35,
  /** Meeting attendance rate */
  attendance: 0.20,
  /** Governance — vote participation + meetings held */
  governance: 0.10,
} as const;

/** Maximum raw score for each component (= weight × 100) */
export const HEALTH_SCORE_MAX = {
  savings: HEALTH_SCORE_WEIGHTS.savings * 100,     // 35
  repayment: HEALTH_SCORE_WEIGHTS.repayment * 100, // 35
  attendance: HEALTH_SCORE_WEIGHTS.attendance * 100, // 20
  governance: HEALTH_SCORE_WEIGHTS.governance * 100, // 10
} as const;

/** Sanity-check: throws at startup if weights are misconfigured */
const totalWeight = Object.values(HEALTH_SCORE_WEIGHTS).reduce((a, b) => a + b, 0);
if (Math.abs(totalWeight - 1.0) > 0.001) {
  throw new Error(
    `HEALTH_SCORE_WEIGHTS must sum to 1.0 — current sum: ${totalWeight}`
  );
}
