import { describe, it, expect } from 'vitest';
import { mkdtempSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { GenerationRequestSchema, type GenerationRequest, type GenerationResult } from '../pipeline/domain';
import { FakeProvider, type Provider, type JobHandle } from '../pipeline/providers/base';
import { CircuitBreaker, withRetry, classifyError, runGenerateJob } from '../pipeline/orchestration';
import { RunRecorder } from '../pipeline/observability';
import type { AssetMeta } from '../pipeline/storage';

const meta: AssetMeta = { asset_id: 'KOL-01', batch: 'b02-kolam-borders-geometry', category: 'kolam', version: 'v1', naming: 'sap_kolam_kol01' };
const request = GenerationRequestSchema.parse({
  request_id: 'r', asset_id: 'KOL-01', modality: 'image', family: 'A',
  composed_prompt: 'x', aspect_ratio: '21:9', resolution: 'vector', prompt_hash: 'ph', num_variants: 2,
});
const retry = { maxAttempts: 3, baseMs: 1, jitter: false };
const noSleep = { sleep: async () => {} };

function vault() {
  return join(mkdtempSync(join(tmpdir(), 'saptham-')), 'vault');
}
function recorder(v: string) {
  return new RunRecorder(v, 'run-test', '--asset KOL-01');
}

/** Provider that fails `failN` times (retryable) before succeeding — or always fails if failN=Infinity. */
class FlakyProvider implements Provider {
  readonly id = 'flaky';
  private calls = 0;
  constructor(private failN: number) {}
  describeCapabilities() { return []; }
  validate() { return { ok: true, issues: [] }; }
  estimateCost() { return 0; }
  async submit(req: GenerationRequest): Promise<GenerationResult> {
    if (this.calls++ < this.failN) throw new Error('503 temporarily unavailable');
    return new FakeProvider().submit(req);
  }
  async poll(_h: JobHandle): Promise<GenerationResult> { throw new Error('n/a'); }
  async fetch() { return new Uint8Array(); }
}

describe('M4 · retry + circuit breaker', () => {
  it('classifies transient vs fatal errors', () => {
    expect(classifyError(new Error('HTTP 503')).retryable).toBe(true);
    expect(classifyError(new Error('400 invalid prompt')).retryable).toBe(false);
  });

  it('retries a transient failure then succeeds', async () => {
    const flaky = new FlakyProvider(2); // one instance so the failure counter persists across retries
    const out = await withRetry(() => flaky.submit(request), retry, noSleep);
    expect(out.state).toBe('succeeded');
  });

  it('circuit breaker opens after N consecutive failures', () => {
    const cb = new CircuitBreaker(3, 1000, () => 0);
    expect(cb.canRequest()).toBe(true);
    cb.recordFailure(); cb.recordFailure(); cb.recordFailure();
    expect(cb.state).toBe('open');
    expect(cb.canRequest()).toBe(false);
  });
});

describe('M4 · runner end-to-end (FakeProvider)', () => {
  it('stores candidates and writes a manifest', async () => {
    const v = vault();
    const cb = new CircuitBreaker(3, 1000);
    const rec = recorder(v);
    const out = await runGenerateJob({ vault: v, provider: new FakeProvider(), request, meta, recorder: rec, retry, breaker: cb, retryHooks: noSleep });
    expect(out.status).toBe('stored');
    rec.finalize([meta.asset_id], {}, 5);
    expect(existsSync(join(v, 'runs', 'run-test', 'manifest.json'))).toBe(true);
  });

  it('re-run is idempotent (skipped)', async () => {
    const v = vault();
    const cb = new CircuitBreaker(3, 1000);
    await runGenerateJob({ vault: v, provider: new FakeProvider(), request, meta, recorder: recorder(v), retry, breaker: cb, retryHooks: noSleep });
    const out = await runGenerateJob({ vault: v, provider: new FakeProvider(), request, meta, recorder: recorder(v), retry, breaker: cb, retryHooks: noSleep });
    expect(out.status).toBe('skipped');
  });

  it('exhausted failures go to the dead-letter queue, not a crash', async () => {
    const v = vault();
    const cb = new CircuitBreaker(10, 1000);
    const rec = recorder(v);
    const out = await runGenerateJob({ vault: v, provider: new FlakyProvider(Infinity), request, meta, recorder: rec, retry, breaker: cb, retryHooks: noSleep });
    expect(out.status).toBe('dead_letter');
    const dlq = readFileSync(join(v, 'runs', 'run-test', 'dlq.jsonl'), 'utf8');
    expect(dlq).toContain('KOL-01');
  });
});
