function twoSum(numbers: number[], target: number): number[] {
  // Array is sorted. Use two pointers — no hash map allowed (O(1) space).
  // Return 1-indexed positions.
  // TODO: implement
  return [];
}


// ─── Test Runner ──────────────────────────────────────────────────────────────
function runTests(cases: Array<[string, unknown, unknown]>): void {
  let passed = 0;
  for (let i = 0; i < cases.length; i++) {
    const [label, result, expected] = cases[i];
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    if (ok) {
      passed++;
      console.log(`✓  ${i + 1}. ${label}`);
    } else {
      console.log(`✗  ${i + 1}. ${label}`);
      console.log(`   Expected: ${JSON.stringify(expected)}`);
      console.log(`   Got:      ${JSON.stringify(result)}`);
    }
  }
  console.log("\n" + "─".repeat(40));
  console.log(`  ${passed}/${cases.length} test cases passed`);
}

runTests([
  ["basic pair",        twoSum([2, 7, 11, 15], 9),  [1, 2]],
  ["non-adjacent pair", twoSum([2, 3, 4], 6),        [1, 3]],
  ["negative numbers",  twoSum([-1, 0], -1),         [1, 2]],
  ["pair at end",       twoSum([1, 2, 3, 4, 5], 9),  [4, 5]],
]);
