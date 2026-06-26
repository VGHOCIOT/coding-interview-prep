from typing import List


class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        # Array is sorted. Use two pointers — no hash map allowed (O(1) space).
        # Return 1-indexed positions.
        # TODO: implement
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
    s = Solution()
    run_tests([
        ("basic pair",          s.twoSum([2, 7, 11, 15], 9),  [1, 2]),
        ("non-adjacent pair",   s.twoSum([2, 3, 4], 6),       [1, 3]),
        ("negative numbers",    s.twoSum([-1, 0], -1),        [1, 2]),
        ("pair at end",         s.twoSum([1, 2, 3, 4, 5], 9), [4, 5]),
    ])
