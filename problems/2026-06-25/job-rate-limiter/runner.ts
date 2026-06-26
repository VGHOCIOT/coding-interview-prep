(function _run() {
  const _rl = new RateLimiter(3, 60_000);
  const _t = 0;
  const _cases = [
    { id: 1, label: "1st request allowed",      call: () => _rl.isAllowed("alice", _t),           expected: true  },
    { id: 2, label: "2nd request allowed",      call: () => _rl.isAllowed("alice", _t + 1),       expected: true  },
    { id: 3, label: "3rd request allowed",      call: () => _rl.isAllowed("alice", _t + 2),       expected: true  },
    { id: 4, label: "4th request blocked",      call: () => _rl.isAllowed("alice", _t + 3),       expected: false },
    { id: 5, label: "different client allowed", call: () => _rl.isAllowed("bob",   _t + 3),       expected: true  },
    { id: 6, label: "after window, allowed",    call: () => _rl.isAllowed("alice", _t + 61_000),  expected: true  },
  ];
  const _results = _cases.map(c => {
    let _actual: unknown;
    try { _actual = c.call(); } catch (_e: any) { _actual = `ERROR: ${_e.message}`; }
    return { id: c.id, label: c.label, passed: JSON.stringify(_actual) === JSON.stringify(c.expected), expected: c.expected, actual: _actual };
  });
  const _passed = _results.filter(r => r.passed).length;
  process.stdout.write("__RESULT__:" + JSON.stringify({ results: _results, summary: { passed: _passed, total: _results.length } }) + "\n");
})();
