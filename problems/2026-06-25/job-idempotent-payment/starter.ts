import { randomUUID } from "crypto";

type ProcessResult =
  | { status: "ok";        confirmationId: string }
  | { status: "duplicate"; confirmationId: string }
  | { status: "conflict" };

class PaymentProcessor {
  // TODO: add a store (Map stands in for Redis)

  process(idempotencyKey: string, amount: number): ProcessResult {
    // TODO:
    // 1. Check store for idempotencyKey
    //    - "completed" → return { status: "duplicate", confirmationId }
    //    - "in-flight" → return { status: "conflict" }
    // 2. Mark key as "in-flight"
    // 3. Generate confirmationId = randomUUID()
    // 4. Mark key as "completed" with confirmationId
    // 5. Return { status: "ok", confirmationId }
    return { status: "conflict" };
  }
}
