class RateLimiter {
  private maxRequests: number;
  private windowMs: number;
  // TODO: add a store to track timestamps per client

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(clientId: string, _nowMs?: number): boolean {
    // _nowMs is injected by tests to control time — use Date.now() if not provided.
    // TODO:
    // 1. Get now (_nowMs ?? Date.now())
    // 2. Retrieve stored timestamps for clientId
    // 3. Drop timestamps older than now - windowMs
    // 4. If remaining.length >= maxRequests → return false
    // 5. Otherwise record now, return true
    return false;
  }
}
