(function _run() {
  const _p = new PaymentProcessor();

  const _safe = (fn: () => unknown) => { try { return fn(); } catch (_e: any) { return { error: _e.message }; } };
  const _get  = (d: any, k: string) => (d && typeof d === 'object' ? d[k] : undefined);

  const _first  = _safe(() => _p.process("key-abc", 50));
  const _repeat = _safe(() => _p.process("key-abc", 50));
  const _fresh  = _safe(() => _p.process("key-xyz", 20));

  const _raw: Array<[number, string, unknown, unknown]> = [
    [1, "first call returns 'ok'",                _get(_first,  "status"),         "ok"],
    [2, "repeat call returns 'duplicate'",        _get(_repeat, "status"),         "duplicate"],
    [3, "repeat returns same confirmationId",     _get(_repeat, "confirmationId"), _get(_first, "confirmationId")],
    [4, "different key is independent",           _get(_fresh,  "status"),         "ok"],
    [5, "different key has unique confirmationId", _get(_fresh, "confirmationId") !== _get(_first, "confirmationId"), true],
  ];

  const _results = _raw.map(([_i, _l, _a, _e]) => ({
    id: _i, label: _l, passed: JSON.stringify(_a) === JSON.stringify(_e), expected: _e, actual: _a,
  }));
  const _passed = _results.filter(r => r.passed).length;
  process.stdout.write("__RESULT__:" + JSON.stringify({ results: _results, summary: { passed: _passed, total: _results.length } }) + "\n");
})();
