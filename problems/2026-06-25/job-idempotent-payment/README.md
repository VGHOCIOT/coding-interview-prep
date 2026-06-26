# Job-Realistic: Idempotent Payment Endpoint

Build a POST `/payments` Express handler that's safe to retry. The client sends an `Idempotency-Key` header. If the same key arrives twice, return the original result instead of processing the payment twice.

## Requirements

- In-memory store standing in for Redis/DynamoDB (a `Map` is fine)
- Handle the race condition: two requests with the same key arriving near-simultaneously should not both succeed
- Return a 409 (or the cached response) on a duplicate, not a second charge
- Add Express error-handling middleware (the 4-argument signature) for malformed input (missing header, bad payload shape)

## What this tests

Middleware design, race-condition awareness, and whether idempotency is a default instinct on mutating endpoints.

## Files

- `store.ts` — idempotency store with TODO stubs
- `handler.ts` — Express handler with TODO stubs
- `handler.test.ts` — tests for the store (add handler-level tests as you implement)
