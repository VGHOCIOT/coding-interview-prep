import time


class RateLimiter:
    """
    Sliding window rate limiter.

    Allows up to `max_requests` calls per `window_ms` milliseconds per client.
    Call is_allowed(client_id) → True if under limit, False if exceeded.
    """

    def __init__(self, max_requests: int, window_ms: int):
        self.max_requests = max_requests
        self.window_ms = window_ms
        # TODO: set up internal storage to track timestamps per client

    def is_allowed(self, client_id: str, _now_ms: float | None = None) -> bool:
        # _now_ms is injected by tests to control time — use time.time() * 1000 otherwise.
        # TODO:
        # 1. Get the current time (use _now_ms if provided, else time.time() * 1000)
        # 2. Retrieve stored timestamps for client_id (default [])
        # 3. Drop timestamps older than now - window_ms
        # 4. If len(remaining) >= max_requests → return False
        # 5. Otherwise append now, save back, return True
        pass


# ─── Test Runner ──────────────────────────────────────────────────────────────
def run_tests(cases):
    passed = 0
    for i, (label, result, expected) in enumerate(cases, 1):
        if result == expected:
            passed += 1
            print(f"✓  {i}. {label}")
        else:
            print(f"✗  {i}. {label}")
            print(f"   Expected: {expected}")
            print(f"   Got:      {result}")
    print("\n" + "─" * 40)
    print(f"  {passed}/{len(cases)} test cases passed")


if __name__ == "__main__":
    rl = RateLimiter(max_requests=3, window_ms=60_000)
    t = 0  # fake clock in ms

    run_tests([
        ("1st request allowed",      rl.is_allowed("alice", t),          True),
        ("2nd request allowed",      rl.is_allowed("alice", t + 1),      True),
        ("3rd request allowed",      rl.is_allowed("alice", t + 2),      True),
        ("4th request blocked",      rl.is_allowed("alice", t + 3),      False),
        ("different client allowed", rl.is_allowed("bob",   t + 3),      True),
        ("after window, allowed",    rl.is_allowed("alice", t + 61_000), True),
    ])
