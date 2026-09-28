// Turns the Order Support Agent's /chat response into the lines shown beside each reply.

export type TraceEvent = {
  event: string;
  latency_ms?: number;
  tool?: string;
  args?: Record<string, unknown>;
  error?: string | null;
};
export type ToolMessage = { name: string; content: string };
export type Line = { text: string; out?: string; blocked?: boolean };

export function traceLines(trace: TraceEvent[], toolMessages: ToolMessage[] = []): Line[] {
  // Tool messages come back in the same order as the tool_call events.
  const results = toolMessages.map((m) => {
    try { return JSON.parse(m.content); } catch { return undefined; }
  });
  let t = 0;
  return trace.map((e) => {
    if (e.event === 'llm_call') return { text: 'call_model', out: `${e.latency_ms} ms` };
    if (e.event === 'loop_detected') return { text: 'loop guard', out: 'stopped after 3 identical calls', blocked: true };
    if (e.event !== 'tool_call') return { text: e.event };

    const result = results[t++];
    const args = Object.values(e.args ?? {}).map((v) => JSON.stringify(v)).join(', ');
    const text = `${e.tool}(${args})`;
    if (e.error === 'requires_confirmation') return { text, out: 'gate: requires_confirmation · tool did not run', blocked: true };
    if (e.error) return { text, out: `error: ${e.error}` };
    if (result === null) return { text, out: 'not found' };
    if (result && typeof result === 'object' && 'status' in result) return { text, out: `status: ${result.status}` };
    return { text, out: 'ok' };
  });
}
