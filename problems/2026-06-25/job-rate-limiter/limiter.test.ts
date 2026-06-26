import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createRateLimiter } from './limiter';
import type { Request, Response, NextFunction } from 'express';

function mockReq(ip = '127.0.0.1'): Partial<Request> {
  return { ip };
}

function mockRes(): { status: ReturnType<typeof vi.fn>; json: ReturnType<typeof vi.fn>; set: ReturnType<typeof vi.fn>; _status?: number } {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.set = vi.fn().mockReturnValue(res);
  return res;
}

describe('createRateLimiter', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('allows requests under the limit', () => {
    const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 3 });
    const next = vi.fn();

    limiter(mockReq() as Request, mockRes() as unknown as Response, next as NextFunction);
    limiter(mockReq() as Request, mockRes() as unknown as Response, next as NextFunction);
    limiter(mockReq() as Request, mockRes() as unknown as Response, next as NextFunction);

    expect(next).toHaveBeenCalledTimes(3);
  });

  it('blocks the request that exceeds the limit with 429', () => {
    const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 2 });
    const next = vi.fn();

    limiter(mockReq() as Request, mockRes() as unknown as Response, next as NextFunction);
    limiter(mockReq() as Request, mockRes() as unknown as Response, next as NextFunction);

    const res = mockRes();
    limiter(mockReq() as Request, res as unknown as Response, next as NextFunction);

    expect(res.status).toHaveBeenCalledWith(429);
    expect(next).toHaveBeenCalledTimes(2);
  });

  it('allows requests again after the window expires', () => {
    const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 2 });
    const next = vi.fn();

    limiter(mockReq() as Request, mockRes() as unknown as Response, next as NextFunction);
    limiter(mockReq() as Request, mockRes() as unknown as Response, next as NextFunction);

    vi.advanceTimersByTime(61_000);

    limiter(mockReq() as Request, mockRes() as unknown as Response, next as NextFunction);

    expect(next).toHaveBeenCalledTimes(3);
  });

  it('tracks different IPs independently', () => {
    const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 1 });
    const next = vi.fn();

    limiter(mockReq('1.1.1.1') as Request, mockRes() as unknown as Response, next as NextFunction);
    limiter(mockReq('2.2.2.2') as Request, mockRes() as unknown as Response, next as NextFunction);

    expect(next).toHaveBeenCalledTimes(2);
  });

  it('sets Retry-After header when blocked', () => {
    const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 1 });
    const next = vi.fn();

    limiter(mockReq() as Request, mockRes() as unknown as Response, next as NextFunction);

    const res = mockRes();
    limiter(mockReq() as Request, res as unknown as Response, next as NextFunction);

    expect(res.set).toHaveBeenCalledWith('Retry-After', expect.any(String));
  });
});
