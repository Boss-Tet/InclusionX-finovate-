// =============================================================================
// services/healthScore/computeHealthScore.ts
// Owned by: Jabari (Financial Logic)
//
// Reads contribution, loan, attendance, and governance data for a group
// and returns a raw HealthScoreBreakdown.
// Does NOT persist anything — call saveHealthScore.ts after this.
//
// IMPORTANT: reads from attendance (Orama's table) — READ ONLY.
// =============================================================================

import db from '@/lib/db';
import { HealthScoreBreakdown } from '@/types/financial';
import { HEALTH_SCORE_WEIGHTS, HEALTH_SCORE_MAX } from '@/config/healthScoreWeights';
import { clamp, safeDivide } from '@/lib/utils/money';

/**
 * Computes the Group Health Score for a given group.
 * Returns a breakdown with each component score (not yet persisted).
 */
export async function computeHealthScore(groupId: string): Promise<HealthScoreBreakdown> {
  const now = new Date();

  // ── 1. Fetch all required data in parallel ────────────────────────────────
  const [
    activeMembers,
    contributions,
    loans,
    meetings,
    loanVotes,
    withdrawalVotes,
  ] = await Promise.all([
    db.groupMember.count({ where: { groupId, status: 'ACTIVE' } }),
    db.contribution.findMany({
      where: { groupId },
      select: { status: true, cyclePeriod: true, memberId: true },
    }),
    db.loan.findMany({
      where: { groupId },
      select: { status: true, dueDate: true, repaidAt: true },
    }),
    db.meeting.findMany({
      where: { groupId },
      include: { attendance: { select: { status: true } } },
    }),
    db.loanVote.count({ where: { loan: { groupId } } }),
    db.withdrawalVote.count({ where: { request: { groupId } } }),
  ]);

  // ── 2. SAVINGS COMPONENT (35 pts) ─────────────────────────────────────────
  // Count distinct cycle periods that had at least one approved contribution
  const approvedCycles = new Set(
    contributions
      .filter((c) => c.status === 'APPROVED' && c.cyclePeriod)
      .map((c) => c.cyclePeriod!)
  ).size;

  // Total expected contributions = active members × distinct cycles
  const distinctCycles = new Set(
    contributions.filter((c) => c.cyclePeriod).map((c) => c.cyclePeriod!)
  ).size;
  const expectedContributions = activeMembers * Math.max(distinctCycles, 1);
  const actualApproved = contributions.filter((c) => c.status === 'APPROVED').length;

  const savingsRate = safeDivide(actualApproved, expectedContributions);
  const savingsComponent = clamp(
    Math.round(savingsRate * HEALTH_SCORE_MAX.savings * 100) / 100,
    0,
    HEALTH_SCORE_MAX.savings
  );

  // ── 3. REPAYMENT COMPONENT (35 pts) ───────────────────────────────────────
  const closedLoans = loans.filter(
    (l) => l.status === 'REPAID' || l.status === 'OVERDUE'
  );
  const repaidOnTime = closedLoans.filter(
    (l) =>
      l.status === 'REPAID' &&
      l.repaidAt != null &&
      l.dueDate != null &&
      l.repaidAt <= l.dueDate
  ).length;

  const repaymentRate = safeDivide(repaidOnTime, Math.max(closedLoans.length, 1));
  const repaymentComponent = clamp(
    Math.round(repaymentRate * HEALTH_SCORE_MAX.repayment * 100) / 100,
    0,
    HEALTH_SCORE_MAX.repayment
  );

  // ── 4. ATTENDANCE COMPONENT (20 pts) ──────────────────────────────────────
  const allAttendance = meetings.flatMap((m) => m.attendance);
  const presentCount = allAttendance.filter((a) => a.status === 'PRESENT').length;
  const attendanceRate = safeDivide(presentCount, Math.max(allAttendance.length, 1));
  const attendanceComponent = clamp(
    Math.round(attendanceRate * HEALTH_SCORE_MAX.attendance * 100) / 100,
    0,
    HEALTH_SCORE_MAX.attendance
  );

  // ── 5. GOVERNANCE COMPONENT (10 pts) ──────────────────────────────────────
  // Vote participation: total votes cast vs expected
  const totalVotableItems = loans.length + 0; // withdrawal items counted via votes table
  const requiredVotesPerLoan = 3; // Chairperson + Treasurer + Secretary
  const maxLoanVotes = totalVotableItems * requiredVotesPerLoan;
  const totalVotesCast = loanVotes + withdrawalVotes;
  const voteParticipationRate = safeDivide(totalVotesCast, Math.max(maxLoanVotes + activeMembers, 1));

  // Meeting held rate: meetings with any attendance recorded
  const meetingsWithAttendance = meetings.filter((m) => m.attendance.length > 0).length;
  const meetingHeldRate = safeDivide(meetingsWithAttendance, Math.max(meetings.length, 1));

  const governanceRate = (voteParticipationRate + meetingHeldRate) / 2;
  const governanceComponent = clamp(
    Math.round(governanceRate * HEALTH_SCORE_MAX.governance * 100) / 100,
    0,
    HEALTH_SCORE_MAX.governance
  );

  // ── 6. COMPOSITE SCORE ────────────────────────────────────────────────────
  const rawScore =
    savingsComponent + repaymentComponent + attendanceComponent + governanceComponent;
  const score = clamp(Math.round(rawScore), 0, 100);

  return {
    score,
    savingsComponent,
    repaymentComponent,
    attendanceComponent,
    governanceComponent,
    computedAt: now,
  };
}
