import assert from 'assert';
import { getThumbFromImageUrl } from '../config/filters.js';

const input = '/foo/bar.jpg';
const expected = '/foo/thumb-bar.jpg';

assert.strictEqual(
  getThumbFromImageUrl(input),
  expected,
  `Expected ${input} to convert to ${expected}`
);

console.log('All tests passed.');
