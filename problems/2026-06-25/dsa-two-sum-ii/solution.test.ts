import { describe, it, expect } from 'vitest';
import { twoSum } from './solution';

describe('twoSum', () => {
  it('finds two numbers in a standard case', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([1, 2]);
  });

  it('handles non-adjacent pair', () => {
    expect(twoSum([2, 3, 4], 6)).toEqual([1, 3]);
  });

  it('handles negative numbers', () => {
    expect(twoSum([-1, 0], -1)).toEqual([1, 2]);
  });

  it('handles pair at the end of the array', () => {
    expect(twoSum([1, 2, 3, 4, 5], 9)).toEqual([4, 5]);
  });
});
