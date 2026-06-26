import json as _json


def _run():
    _p = PaymentProcessor()

    def _safe(fn):
        try:    return fn()
        except Exception as _e: return {"error": str(_e)}

    def _get(d, k):
        return d.get(k) if isinstance(d, dict) else None

    _first  = _safe(lambda: _p.process("key-abc", 50.0))
    _repeat = _safe(lambda: _p.process("key-abc", 50.0))
    _fresh  = _safe(lambda: _p.process("key-xyz", 20.0))

    _raw = [
        (1, "first call returns 'ok'",
             _get(_first,  "status"), "ok"),
        (2, "repeat call returns 'duplicate'",
             _get(_repeat, "status"), "duplicate"),
        (3, "repeat returns same confirmation_id",
             _get(_repeat, "confirmation_id"), _get(_first, "confirmation_id")),
        (4, "different key is independent",
             _get(_fresh,  "status"), "ok"),
        (5, "different key has unique confirmation_id",
             _get(_fresh, "confirmation_id") != _get(_first, "confirmation_id"), True),
    ]
    _results = [
        {"id": _i, "label": _l, "passed": _a == _e, "expected": _e, "actual": _a}
        for _i, _l, _a, _e in _raw
    ]
    _passed = sum(1 for r in _results if r["passed"])
    print("__RESULT__:" + _json.dumps({"results": _results, "summary": {"passed": _passed, "total": len(_results)}}))


_run()
