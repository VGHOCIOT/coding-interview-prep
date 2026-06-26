from typing import List


class Solution:
    def maxArea(self, height: List[int]) -> int:
        # Find two lines that form the container holding the most water.
        # Brute force is O(n²) — justify why moving the shorter pointer inward is safe.
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
        ("standard example",    s.maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]), 49),
        ("minimum two lines",   s.maxArea([1, 1]),                        1),
        ("descending heights",  s.maxArea([4, 3, 2, 1]),                  4),
        ("equal heights",       s.maxArea([5, 5, 5, 5]),                 15),
    ])
