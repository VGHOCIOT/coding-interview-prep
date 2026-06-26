const { randomUUID } = require("crypto");

class PaymentProcessor {
  constructor() {
    // TODO: add a store (Map stands in for Redis)
  }

  process(idempotencyKey, amount) {
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
