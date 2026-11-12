// Replay data for the hero's Warden panel. Check names from warden/docs/how-it-works.md.
export const CHECKS = [
  'agent registered for this scope',
  'engagement is in your firm',
  'user exists and is active',
  'ethical wall',
  'member of the engagement',
  'role allows the scope',
  'action is on the pass',
];

export type CheckState = 'pass' | 'fail' | 'skip';

/** failAt is the 1-based check that says no; null means every check passes. */
export function checkStates(failAt: number | null): CheckState[] {
  return CHECKS.map((_, i) => {
    if (failAt === null || i + 1 < failAt) return 'pass';
    return i + 1 === failAt ? 'fail' : 'skip';
  });
}

export const SCENARIOS = {
  wall: {
    label: 'Wrong client',
    failAt: 4,
    code: '403',
    agent: 'tickmark.agent',
    who: 'Sara · Staff on Coke',
    asks: 'Pepsi 2026 · vouch.run',
    reason: 'refused: "ethical wall: Works on Coke 2026"',
    audit: 'audit row written · checks 5–7 never ran',
  },
  allow: {
    label: 'Right client',
    failAt: null,
    code: '200',
    agent: 'tickmark.agent',
    who: 'Sara · Staff on Coke',
    asks: 'Coke 2026 · vouch.run',
    reason: 'allowed: call forwarded to the tool server',
    audit: 'audit row written · 7 of 7 checks passed',
  },
  hidden: {
    label: 'Injected tool call',
    failAt: 7,
    code: 'unknown tool',
    agent: 'tickmark.agent',
    who: 'Sara · Staff on Coke',
    asks: 'Coke 2026 · export_documents',
    reason: 'refused: the tool is not on this pass',
    audit: 'audit row written · nothing reached the tool',
  },
} as const;

export type ScenarioId = keyof typeof SCENARIOS;
