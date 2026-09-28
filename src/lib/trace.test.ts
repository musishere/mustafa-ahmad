// Run: node src/lib/trace.test.ts
import assert from 'node:assert/strict';
import { traceLines } from './trace.ts';

// Shape copied from OrderSupportAgent server.py /chat: a shipped-order address change.
const lines = traceLines(
  [
    { event: 'llm_call', latency_ms: 812 },
    { event: 'tool_call', tool: 'get_order', args: { order_id: 'ORD0008' }, error: null },
    { event: 'llm_call', latency_ms: 640 },
    { event: 'tool_call', tool: 'update_shipping_address', args: { order_id: 'ORD0008', new_address: '999 Hijacked Ave' }, error: 'requires_confirmation' },
    { event: 'loop_detected' },
  ],
  [
    { name: 'get_order', content: '{"order_id": "ORD0008", "status": "shipped"}' },
    { name: 'update_shipping_address', content: '{"success": false, "error": "requires_confirmation"}' },
  ],
);

assert.deepEqual(lines[0], { text: 'call_model', out: '812 ms' });
assert.deepEqual(lines[1], { text: 'get_order("ORD0008")', out: 'status: shipped' });
assert.equal(lines[3].text, 'update_shipping_address("ORD0008", "999 Hijacked Ave")');
assert.equal(lines[3].blocked, true);
assert.equal(lines[4].blocked, true);
assert.deepEqual(traceLines([{ event: 'tool_call', tool: 'get_order', args: { order_id: 'X' } }], [{ name: 'get_order', content: 'null' }])[0].out, 'not found');
console.log('trace ok');
