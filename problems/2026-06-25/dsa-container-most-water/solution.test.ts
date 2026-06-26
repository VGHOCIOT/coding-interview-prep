import { describe, it, expect } from 'vitest';
import { maxArea } from './solution';

describe('maxArea', () => {
  it('handles the standard example', () => {
    expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
  });

  it('handles the minimum case of two elements', () => {
    expect(maxArea([1, 1])).toBe(1);
  });
});
