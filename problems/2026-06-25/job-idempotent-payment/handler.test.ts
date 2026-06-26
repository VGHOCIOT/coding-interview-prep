import { describe, it, expect } from 'vitest';
import { createIdempotencyStore } from './store';

describe('createIdempotencyStore', () => {
  it('reserves a new key', () => {
    const store = createIdempotencyStore<{ ok: true }>();
    expect(store.reserve('key-1')).toBe(true);
  });

  it('rejects a second reservation of the same key', () => {
    const store = createIdempotencyStore<{ ok: true }>();
    store.reserve('key-1');
    expect(store.reserve('key-1')).toBe(false);
  });

  it('returns the completed result on repeat lookup', () => {
    const store = createIdempotencyStore<{ ok: true }>();
    store.reserve('key-1');
    store.complete('key-1', { ok: true });
    expect(store.get('key-1')).toEqual({ status: 'completed', result: { ok: true } });
  });
});
