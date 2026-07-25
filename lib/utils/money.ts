// =============================================================================
// lib/utils/money.ts
// Owned by: Jabari (Financial Logic)
//
// Pure helper functions for Malawian Kwacha / tambala conversions.
// RULE: All monetary values are stored as integer tambala in the database.
//       1 MWK = 100 tambala. Never use floats for money storage.
// =============================================================================

/**
 * Convert MWK (decimal display value) to integer tambala for DB storage.
 * Example: mwkToTambala(1234.50) → 123450
 */
export const mwkToTambala = (mwk: number): number => Math.round(mwk * 100);

/**
 * Convert integer tambala from DB to MWK decimal for display.
 * Example: tambalaToMWK(123450) → 1234.5
 */
export const tambalaToMWK = (tambala: number): number => tambala / 100;

/**
 * Format tambala amount as a human-readable MWK string.
 * Example: formatMWK(123450) → "MWK 1,234.50"
 */
export const formatMWK = (tambala: number): string =>
  `MWK ${(tambala / 100).toLocaleString('en-MW', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

/**
 * Calculate simple interest on a principal.
 * Returns interest amount in tambala (integer, rounded).
 * Example: calcSimpleInterest(100_000, 10) → 10000 (10% of 1000 MWK)
 */
export const calcSimpleInterest = (
  principalTambala: number,
  ratePct: number
): number => Math.round(principalTambala * (ratePct / 100));

/**
 * Calculate total due (principal + simple interest) for a loan.
 * Returns tambala integer.
 */
export const calcTotalDue = (
  principalTambala: number,
  ratePct: number
): number => principalTambala + calcSimpleInterest(principalTambala, ratePct);

/**
 * Clamp a value between min and max (inclusive).
 * Used for Health Score components to ensure 0–max bounds.
 */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/**
 * Safe division — returns 0 instead of NaN/Infinity when denominator is 0.
 */
export const safeDivide = (numerator: number, denominator: number): number =>
  denominator === 0 ? 0 : numerator / denominator;
