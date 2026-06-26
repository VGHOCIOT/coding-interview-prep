class RateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    // TODO: add a store to track timestamps per client
  }

  isAllowed(clientId, _nowMs) {
    // _nowMs is injected by tests to control time — use Date.now() if not provided.
    // TODO: implement sliding window
    return false;
  }
}
