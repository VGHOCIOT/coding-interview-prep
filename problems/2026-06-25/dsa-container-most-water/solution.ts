function maxArea(height: number[]): number {
  // Find two lines that form the container holding the most water.
  // Brute force is O(n²) — justify why moving the shorter pointer inward is safe.
  // TODO: implement
  return 0;
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
  ["standard example",   maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]), 49],
  ["minimum two lines",  maxArea([1, 1]),                         1],
  ["descending heights", maxArea([4, 3, 2, 1]),                   4],
  ["equal heights",      maxArea([5, 5, 5, 5]),                  15],
]);
