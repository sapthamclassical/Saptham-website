import { describe, it, expect } from 'vitest';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { GenerationRequestSchema } from '../pipeline/domain';
import { FakeAsyncProvider } from '../pipeline/providers/base';
import { submitVideoJob, resolveVideoJob, loadJob, pendingJobs } from '../pipeline/orchestration';
import type { AssetMeta } from '../pipeline/storage';

const meta: AssetMeta = { asset_id: 'HERO-11', batch: 'b10-art-directed-photography', category: 'hero', version: 'v1', naming: 'sap_hero_hero11' };
const request = GenerationRequestSchema.parse({
  request_id: 'rv', asset_id: 'HERO-11', modality: 'video', family: 'photo',
  composed_prompt: 'ambient lamp loop', aspect_ratio: '16:9', resolution: '1080', prompt_hash: 'phv', num_variants: 1,
});
const retry = { maxAttempts: 4, baseMs: 1, jitter: false };
const noSleep = { sleep: async () => {} };

function vault() {
  return join(mkdtempSync(join(tmpdir(), 'saptham-m7-')), 'vault');
}

describe('M7 · async video jobs (durable)', () => {
  it('submit persists a durable job with the provider handle', async () => {
    const v = vault();
    const job = await submitVideoJob(v, new FakeAsyncProvider(2), request, meta, { runId: 'run-1', jobId: 'job-1', createdAt: 't0' });
    expect(job.state).toBe('awaiting_poll');
    expect(job.job_handle).toBe('handle-rv');
    // persisted to disk
    expect(loadJob(v, 'job-1')?.job_handle).toBe('handle-rv');
    expect(pendingJobs(v).map((j) => j.job_id)).toEqual(['job-1']);
  });

  it('a FRESH process (restart) resolves a persisted job it never submitted', async () => {
    const v = vault();
    await submitVideoJob(v, new FakeAsyncProvider(2), request, meta, { runId: 'run-1', jobId: 'job-1', createdAt: 't0' });

    // simulate restart: reload the job from disk + a brand-new provider instance
    const reloaded = loadJob(v, 'job-1')!;
    const outcome = await resolveVideoJob(v, new FakeAsyncProvider(2), reloaded, { retry, ...noSleep, pollIntervalMs: 0 });

    expect(outcome.status).toBe('stored');
    expect(loadJob(v, 'job-1')?.state).toBe('succeeded');
    expect(pendingJobs(v)).toHaveLength(0);
  });

  it('polls running→succeeded then stores the mp4 artifact', async () => {
    const v = vault();
    const provider = new FakeAsyncProvider(3); // running twice, then succeeds
    const job = await submitVideoJob(v, provider, request, meta, { runId: 'run-1', jobId: 'job-2', createdAt: 't0' });
    const outcome = await resolveVideoJob(v, provider, job, { retry, ...noSleep, pollIntervalMs: 0 });
    expect(outcome.status).toBe('stored');
    if (outcome.status === 'stored') expect(outcome.artifacts[0]?.mime).toBe('video/mp4');
  });

  it('a job whose provider fails goes to dead_letter', async () => {
    const v = vault();
    const failing = {
      id: 'boom',
      describeCapabilities: () => [],
      validate: () => ({ ok: true, issues: [] }),
      estimateCost: () => 0,
      submit: async () => ({ request_id: 'rv', provider: 'boom', model: 'm', state: 'awaiting_poll' as const, job_handle: 'h', artifacts: [], revised_prompt: null, latency_ms: 0, cost: 0, raw_response_ref: null, error: null }),
      poll: async () => { throw new Error('fatal provider error'); },
      fetch: async () => new Uint8Array(),
    };
    const job = await submitVideoJob(v, failing, request, meta, { runId: 'run-1', jobId: 'job-3', createdAt: 't0' });
    const outcome = await resolveVideoJob(v, failing, job, { retry, ...noSleep, pollIntervalMs: 0 });
    expect(outcome.status).toBe('dead_letter');
    expect(loadJob(v, 'job-3')?.state).toBe('dead_letter');
    expect(loadJob(v, 'job-3')?.last_error).toMatch(/fatal/);
  });
});
