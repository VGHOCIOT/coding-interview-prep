(function _run() {
  const _cases = [
    { id: 1, label: "basic pair",        call: () => twoSum([2, 7, 11, 15], 9),  expected: [1, 2] },
    { id: 2, label: "non-adjacent pair", call: () => twoSum([2, 3, 4], 6),       expected: [1, 3] },
    { id: 3, label: "negative numbers",  call: () => twoSum([-1, 0], -1),        expected: [1, 2] },
    { id: 4, label: "pair at end",       call: () => twoSum([1, 2, 3, 4, 5], 9), expected: [4, 5] },
  ];
  const _results = _cases.map(c => {
    let _actual;
    try { _actual = c.call(); } catch (_e) { _actual = `ERROR: ${_e.message}`; }
    return { id: c.id, label: c.label, passed: JSON.stringify(_actual) === JSON.stringify(c.expected), expected: c.expected, actual: _actual };
  });
  const _passed = _results.filter(r => r.passed).length;
  process.stdout.write("__RESULT__:" + JSON.stringify({ results: _results, summary: { passed: _passed, total: _results.length } }) + "\n");
})();
