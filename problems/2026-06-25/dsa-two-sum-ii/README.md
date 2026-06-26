# DSA Pattern: Two Sum II — Sorted Array

Given a **1-indexed** sorted array `numbers`, find two numbers that add up to `target`. Return their indices as `[index1, index2]` where `index1 < index2`.

Exactly one solution is guaranteed. You may not use the same element twice.

## Examples

```
Input: numbers = [2,7,11,15], target = 9  → Output: [1,2]
Input: numbers = [2,3,4],     target = 6  → Output: [1,3]
Input: numbers = [-1,0],      target = -1 → Output: [1,2]
```

## Constraints

- The array is sorted ascending
- Must use O(1) extra space (no hash map)

## What this tests

Recognising that a sorted array enables two pointers: if `sum < target` move left pointer right, if `sum > target` move right pointer left. Justify why this never misses the answer.

## Files

- `solution.ts` — implement here
- `solution.test.ts` — test cases
