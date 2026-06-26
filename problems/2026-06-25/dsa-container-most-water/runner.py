import json as _json


def _run():
    _s = Solution()
    _cases = [
        (1, "standard example",   lambda: _s.maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]), 49),
        (2, "minimum two lines",  lambda: _s.maxArea([1, 1]),                         1),
        (3, "descending heights", lambda: _s.maxArea([4, 3, 2, 1]),                   4),
        (4, "equal heights",      lambda: _s.maxArea([5, 5, 5, 5]),                  15),
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
