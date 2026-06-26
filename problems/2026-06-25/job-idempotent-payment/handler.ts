import { Request, Response, NextFunction } from 'express';
import { createIdempotencyStore } from './store';

interface PaymentPayload {
  amount: number;
}

interface PaymentResult {
  confirmationId: string;
}

const store = createIdempotencyStore<PaymentResult>();

export function paymentHandler(req: Request, res: Response, next: NextFunction) {
  const idempotencyKey = req.header('Idempotency-Key');

  if (!idempotencyKey) {
    return next(new Error('Missing Idempotency-Key header'));
  }

  // TODO:
  // - check store.get(idempotencyKey) first
  //   - if completed, return the cached result with 200
  //   - if in-flight, return 409
  // - otherwise store.reserve(idempotencyKey), process the payment
  //   (just fake a confirmationId, no real payment processor needed),
  //   then store.complete(idempotencyKey, result), and respond 200

  res.status(501).json({ error: 'not implemented' });
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  // TODO: implement
  res.status(400).json({ error: err.message });
}
