import { Request, Response, NextFunction } from 'express';

interface RateLimiterOptions {
  windowMs: number;
  maxRequests: number;
}

export function createRateLimiter(options: RateLimiterOptions) {
  const { windowMs, maxRequests } = options;
  const store = new Map<string, number[]>();

  return function rateLimiter(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip ?? 'unknown';
    const now = Date.now();

    // TODO:
    // 1. Get timestamps for this IP (default to [])
    // 2. Filter out timestamps older than `now - windowMs`
    // 3. If filtered.length >= maxRequests:
    //    - Compute retryAfter = Math.ceil((filtered[0] + windowMs - now) / 1000)
    //    - res.set('Retry-After', String(retryAfter))
    //    - return res.status(429).json({ error: 'Too Many Requests' })
    // 4. Otherwise push `now`, update the store, call next()

    next();
  };
}
