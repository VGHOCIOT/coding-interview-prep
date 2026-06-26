(function _run() {
  const _cases = [
    { id: 1, label: "standard example",   call: () => maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]), expected: 49 },
    { id: 2, label: "minimum two lines",  call: () => maxArea([1, 1]),                        expected: 1  },
    { id: 3, label: "descending heights", call: () => maxArea([4, 3, 2, 1]),                  expected: 4  },
    { id: 4, label: "equal heights",      call: () => maxArea([5, 5, 5, 5]),                  expected: 15 },
  ];
  const _results = _cases.map(c => {
    let _actual: unknown;
    try { _actual = c.call(); } catch (_e: any) { _actual = `ERROR: ${_e.message}`; }
    return { id: c.id, label: c.label, passed: JSON.stringify(_actual) === JSON.stringify(c.expected), expected: c.expected, actual: _actual };
  });
  const _passed = _results.filter(r => r.passed).length;
  process.stdout.write("__RESULT__:" + JSON.stringify({ results: _results, summary: { passed: _passed, total: _results.length } }) + "\n");
})();
