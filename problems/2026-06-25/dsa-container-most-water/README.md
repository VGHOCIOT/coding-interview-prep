# DSA Pattern: Container With Most Water

Given an array `height` where each value is the height of a vertical line at that index, find two lines that, together with the x-axis, form a container holding the most water. Return the max area.

## Examples

```
Input: [1,8,6,2,5,4,8,3,7] → Output: 49
Input: [1,1] → Output: 1
```

## What this tests

Recognizing brute force is O(n²), and justifying why moving the shorter pointer inward is always safe in the optimal two-pointer approach.

## Files

- `solution.ts` — implement here
- `solution.test.ts` — test cases
