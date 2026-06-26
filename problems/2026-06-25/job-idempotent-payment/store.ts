type StoredState<T> =
  | { status: 'in-flight' }
  | { status: 'completed'; result: T };

export interface IdempotencyStore<T> {
  get(key: string): StoredState<T> | undefined;
  reserve(key: string): boolean;
  complete(key: string, result: T): void;
}

export function createIdempotencyStore<T>(): IdempotencyStore<T> {
  const store = new Map<string, StoredState<T>>();

  return {
    get(key) {
      return store.get(key);
    },
    reserve(key) {
      // TODO: return false if key already exists (in-flight or completed)
      // otherwise set it to { status: 'in-flight' } and return true
      throw new Error('not implemented');
    },
    complete(key, result) {
      // TODO: set the key to { status: 'completed', result }
      throw new Error('not implemented');
    },
  };
}
