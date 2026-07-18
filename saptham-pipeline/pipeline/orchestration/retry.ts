import type { ErrorInfo } from '../domain';

/** Classify an error as retryable (429/5xx/timeout/transient) or fatal (4xx/validation). */
export function classifyError(err: unknown): ErrorInfo {
  const message = err instanceof Error ? err.message : String(err);
  const retryable = /\b(429|5\d\d|timeout|timed out|ECONNRESET|ETIMEDOUT|temporarily|rate.?limit)\b/i.test(message);
  return { code: retryable ? 'retryable' : 'fatal', retryable, message };
}

export interface RetryPolicy {
  maxAttempts: number;
  baseMs: number;
  jitter: boolean;
}

export interface RetryHooks {
  sleep?: (ms: number) => Promise<void>;
  onRetry?: (attempt: number, info: ErrorInfo, delayMs: number) => void;
  rand?: () => number;
}

const defaultSleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Exponential backoff with optional jitter. Stops early on a fatal (non-retryable) error. */
export async function withRetry<T>(fn: () => Promise<T>, policy: RetryPolicy, hooks: RetryHooks = {}): Promise<T> {
  const sleep = hooks.sleep ?? defaultSleep;
  const rand = hooks.rand ?? Math.random;
  let lastInfo: ErrorInfo | null = null;
  for (let attempt = 1; attempt <= policy.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastInfo = classifyError(err);
      if (!lastInfo.retryable || attempt === policy.maxAttempts) throw err;
      const backoff = policy.baseMs * 2 ** (attempt - 1);
      const delay = policy.jitter ? Math.floor(backoff * (0.5 + rand() * 0.5)) : backoff;
      hooks.onRetry?.(attempt, lastInfo, delay);
      await sleep(delay);
    }
  }
  throw new Error(lastInfo?.message ?? 'retry exhausted');
}

export type BreakerState = 'closed' | 'open' | 'half_open';

/** Per-provider circuit breaker: N consecutive failures → OPEN (skip) → cooldown → HALF-OPEN probe. */
export class CircuitBreaker {
  private failures = 0;
  private openedAt = 0;
  state: BreakerState = 'closed';

  constructor(
    private readonly failuresToOpen: number,
    private readonly cooldownMs: number,
    private readonly now: () => number = () => Date.now(),
  ) {}

  canRequest(): boolean {
    if (this.state === 'open' && this.now() - this.openedAt >= this.cooldownMs) this.state = 'half_open';
    return this.state !== 'open';
  }

  recordSuccess(): void {
    this.failures = 0;
    this.state = 'closed';
  }

  recordFailure(): void {
    this.failures += 1;
    if (this.failures >= this.failuresToOpen) {
      this.state = 'open';
      this.openedAt = this.now();
    }
  }
}
