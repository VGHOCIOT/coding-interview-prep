import json as _json


def _run():
    _s = Solution()
    _cases = [
        (1, "basic pair",        lambda: _s.twoSum([2, 7, 11, 15], 9),  [1, 2]),
        (2, "non-adjacent pair", lambda: _s.twoSum([2, 3, 4], 6),       [1, 3]),
        (3, "negative numbers",  lambda: _s.twoSum([-1, 0], -1),        [1, 2]),
        (4, "pair at end",       lambda: _s.twoSum([1, 2, 3, 4, 5], 9), [4, 5]),
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
