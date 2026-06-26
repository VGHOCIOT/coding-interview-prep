import { randomUUID } from "crypto";

type StoreEntry =
  | { status: "in-flight" }
  | { status: "completed"; confirmationId: string };

type ProcessResult =
  | { status: "ok";        confirmationId: string }
  | { status: "duplicate"; confirmationId: string }
  | { status: "conflict" };

class PaymentProcessor {
  /**
   * Idempotent payment processor.
   *
   * process(idempotencyKey, amount) must be safe to retry:
   * - First call processes and stores the result.
   * - Repeat calls with the same key return the original result without recharging.
   * - Two simultaneous calls with the same key: only one should process.
   */

  // TODO: add a store (Map is fine — stands in for Redis)

  process(idempotencyKey: string, amount: number): ProcessResult {
    // TODO:
    // 1. Check store for idempotencyKey
    //    - If "completed" → return { status: "duplicate", confirmationId }
    //    - If "in-flight"  → return { status: "conflict" }
    // 2. Mark key as "in-flight"
    // 3. Fake the charge: confirmationId = randomUUID()
    // 4. Mark key as "completed" with confirmationId
    // 5. Return { status: "ok", confirmationId }
    return { status: "conflict" };
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

const p = new PaymentProcessor();

const first  = p.process("key-abc", 50);
const repeat = p.process("key-abc", 50);
const fresh  = p.process("key-xyz", 20);

runTests([
  ["first call returns ok",
    (first  as any).status, "ok"],
  ["repeat call returns duplicate",
    (repeat as any).status, "duplicate"],
  ["repeat returns same confirmationId",
    (repeat as any).confirmationId, (first as any).confirmationId],
  ["different key is independent",
    (fresh  as any).status, "ok"],
  ["different key has its own confirmationId",
    (fresh as any).confirmationId !== (first as any).confirmationId, true],
]);
