import uuid
from typing import Literal


class PaymentProcessor:
    """
    Idempotent payment processor.

    process(idempotency_key, amount) must be safe to retry:
    - First call processes and stores the result.
    - Repeat calls with the same key return the original result without recharging.
    - Two simultaneous calls with the same key: only one should process.
    """

    def __init__(self):
        # TODO: set up internal store (dict is fine — stands in for Redis)
        pass

    def process(self, idempotency_key: str, amount: float) -> dict:
        """
        Returns:
          { "status": "ok",       "confirmation_id": str }  — new payment
          { "status": "duplicate","confirmation_id": str }  — repeated key (same result)
          { "status": "conflict" }                          — key in-flight (race condition)
        TODO:
        1. Check store for idempotency_key
           - If "completed" → return { status: "duplicate", confirmation_id: ... }
           - If "in-flight"  → return { status: "conflict" }
        2. Mark key as "in-flight"
        3. Fake the charge: confirmation_id = str(uuid.uuid4())
        4. Mark key as "completed" with confirmation_id
        5. Return { status: "ok", confirmation_id: ... }
        """
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
    p = PaymentProcessor()

    first = p.process("key-abc", 50.0)
    repeat = p.process("key-abc", 50.0)
    fresh = p.process("key-xyz", 20.0)

    run_tests([
        ("first call returns ok",
            first.get("status") if first else None,
            "ok"),
        ("repeat call returns duplicate",
            repeat.get("status") if repeat else None,
            "duplicate"),
        ("repeat returns same confirmation_id",
            repeat.get("confirmation_id") if repeat else None,
            first.get("confirmation_id") if first else None),
        ("different key is independent",
            fresh.get("status") if fresh else None,
            "ok"),
        ("different key has its own confirmation_id",
            fresh.get("confirmation_id") != first.get("confirmation_id") if fresh and first else False,
            True),
    ])
