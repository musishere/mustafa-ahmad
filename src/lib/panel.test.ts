// Run: node src/lib/panel.test.ts
import assert from 'node:assert/strict';
import { CHECKS, checkStates } from './panel.ts';
import { parseContributions } from './github.ts';

assert.equal(CHECKS.length, 7);
assert.deepEqual(checkStates(null), Array(7).fill('pass'));
assert.deepEqual(checkStates(4), ['pass', 'pass', 'pass', 'fail', 'skip', 'skip', 'skip']);
assert.deepEqual(checkStates(7).slice(5), ['pass', 'fail']);

// Shape copied from github.com/users/<name>/contributions; rows are by weekday, so dates arrive out of order.
const { days, total } = parseContributions(`
  <td data-date="2025-11-16" id="a" data-level="3" class="x"></td>
  <td data-date="2025-11-09" id="b" data-level="0" class="x"></td>
  <h2>1,204
      contributions
        in the last year</h2>`);
assert.deepEqual(days, [{ date: '2025-11-09', level: 0 }, { date: '2025-11-16', level: 3 }]);
assert.equal(total, '1,204');
assert.equal(parseContributions('<p>nope</p>').total, null);
console.log('panel ok');
