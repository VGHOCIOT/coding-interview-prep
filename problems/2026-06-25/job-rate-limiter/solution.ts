class RateLimiter {
  /**
   * Sliding window rate limiter.
   * Allows up to maxRequests calls per windowMs milliseconds per client.
   * Call isAllowed(clientId) → true if under limit, false if exceeded.
   */

  private maxRequests: number;
  private windowMs: number;
  // TODO: add a store to track timestamps per client

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    // TODO: initialise storage
  }

  isAllowed(clientId: string, _nowMs?: number): boolean {
    // _nowMs is injected by tests to control time — use Date.now() otherwise.
    // TODO:
    // 1. Get current time (use _nowMs if provided, else Date.now())
    // 2. Retrieve stored timestamps for clientId (default [])
    // 3. Drop timestamps older than now - windowMs
    // 4. If remaining.length >= maxRequests → return false
    // 5. Otherwise push now, save back, return true
    return false;
  }
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

const rl = new RateLimiter(3, 60_000);
const t = 0; // fake clock in ms

runTests([
  ["1st request allowed",      rl.isAllowed("alice", t),           true],
  ["2nd request allowed",      rl.isAllowed("alice", t + 1),       true],
  ["3rd request allowed",      rl.isAllowed("alice", t + 2),       true],
  ["4th request blocked",      rl.isAllowed("alice", t + 3),       false],
  ["different client allowed", rl.isAllowed("bob",   t + 3),       true],
  ["after window, allowed",    rl.isAllowed("alice", t + 61_000),  true],
]);
