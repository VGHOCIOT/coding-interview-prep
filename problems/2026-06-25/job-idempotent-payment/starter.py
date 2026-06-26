import uuid


class PaymentProcessor:
    """
    Idempotent payment processor.
    process() must be safe to retry — same key should never charge twice.
    """

    def __init__(self):
        # TODO: set up an internal store (dict stands in for Redis)
        pass

    def process(self, idempotency_key: str, amount: float) -> dict:
        """
        Returns:
          { "status": "ok",        "confirmation_id": str }  — new payment processed
          { "status": "duplicate", "confirmation_id": str }  — key seen before, returning cached result
          { "status": "conflict" }                           — key currently in-flight (race condition)
        TODO:
        1. Check store for idempotency_key
           - "completed" → return { status: "duplicate", confirmation_id: ... }
           - "in-flight" → return { status: "conflict" }
        2. Mark key as "in-flight"
        3. Generate confirmation_id = str(uuid.uuid4())
        4. Mark key as "completed" with confirmation_id
        5. Return { status: "ok", confirmation_id: ... }
        """
        pass
