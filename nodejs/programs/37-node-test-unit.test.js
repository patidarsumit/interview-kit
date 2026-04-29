import test from 'node:test';
import assert from 'node:assert/strict';

function add(a, b) {
  return a + b;
}

test('adds numbers', () => {
  assert.equal(add(2, 3), 5);
});

