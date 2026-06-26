import json as _json


def _run():
    _rl = RateLimiter(max_requests=3, window_ms=60_000)
    _t = 0
    _cases = [
        (1, "1st request allowed",      lambda: _rl.is_allowed("alice", _t),           True),
        (2, "2nd request allowed",      lambda: _rl.is_allowed("alice", _t + 1),       True),
        (3, "3rd request allowed",      lambda: _rl.is_allowed("alice", _t + 2),       True),
        (4, "4th request blocked",      lambda: _rl.is_allowed("alice", _t + 3),       False),
        (5, "different client allowed", lambda: _rl.is_allowed("bob",   _t + 3),       True),
        (6, "after window, allowed",    lambda: _rl.is_allowed("alice", _t + 61_000),  True),
    ]
    _results = []
    for _id, _label, _call, _expected in _cases:
        try:
            _actual = _call()
        except Exception as _e:
            _actual = f"ERROR: {_e}"
        _results.append({
            "id": _id, "label": _label,
            "passed": _actual == _expected,
            "expected": _expected, "actual": _actual,
        })
    _passed = sum(1 for r in _results if r["passed"])
    print("__RESULT__:" + _json.dumps({"results": _results, "summary": {"passed": _passed, "total": len(_results)}}))


_run()
