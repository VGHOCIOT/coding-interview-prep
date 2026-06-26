class RateLimiter:
    """
    Sliding window rate limiter.
    Allows up to max_requests calls per window_ms milliseconds per client.
    """

    def __init__(self, max_requests: int, window_ms: int):
        self.max_requests = max_requests
        self.window_ms = window_ms
        # TODO: set up storage to track request timestamps per client

    def is_allowed(self, client_id: str, _now_ms: float | None = None) -> bool:
        # _now_ms is injected by tests to control time — use time.time() * 1000 if not provided.
        # TODO:
        # 1. Get now (_now_ms or time.time() * 1000)
        # 2. Retrieve stored timestamps for client_id
        # 3. Drop timestamps older than now - window_ms
        # 4. If len(remaining) >= max_requests → return False
        # 5. Otherwise record now, return True
        pass
