# Job-Realistic: Rate Limiter Middleware

Build Express middleware that rate-limits requests per client IP using a **sliding window** algorithm. If a client exceeds `maxRequests` within `windowMs`, respond with HTTP 429.

## Requirements

- Track request timestamps per IP in an in-memory store
- On each request: drop timestamps older than `windowMs`, then count what's left
- If count >= `maxRequests`, return 429 with `{ error: 'Too Many Requests' }` and a `Retry-After` header (seconds until oldest request expires)
- Otherwise record the current timestamp and call `next()`
- `createRateLimiter(options)` should return the middleware function

## Example

```ts
const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 5 });
app.use(limiter);
```

## What this tests

Sliding window vs token bucket trade-offs, timestamp arithmetic, middleware signature, and HTTP 429 semantics with `Retry-After`.

## Files

- `limiter.ts` — implement `createRateLimiter` here
- `limiter.test.ts` — tests (uses a fake clock via vitest's `vi.useFakeTimers`)
