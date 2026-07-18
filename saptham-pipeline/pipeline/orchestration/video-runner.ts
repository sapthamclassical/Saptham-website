import type { GenerationRequest } from '../domain';
import type { Provider } from '../providers/base';
import { storeResult, type AssetMeta, type StoredArtifact } from '../storage';
import { withRetry, type RetryPolicy } from './retry';
import { saveJob, type JobRecord } from './job-store';

export interface SubmitOpts {
  runId: string;
  jobId: string;
  createdAt: string;
}

/** Submit an async (video) job and persist its handle durably (survives restart). */
export async function submitVideoJob(
  vault: string,
  provider: Provider,
  request: GenerationRequest,
  meta: AssetMeta,
  opts: SubmitOpts,
): Promise<JobRecord> {
  const result = await provider.submit(request);
  const rec: JobRecord = {
    job_id: opts.jobId, asset_id: meta.asset_id, version: meta.version,
    provider: provider.id, model: result.model, state: result.state,
    job_handle: result.job_handle, request, meta, run_id: opts.runId,
    attempts: 0, last_error: null, created_at: opts.createdAt,
  };
  saveJob(vault, rec);
  return rec;
}

export type ResolveOutcome =
  | { status: 'stored'; artifacts: StoredArtifact[] }
  | { status: 'pending' }
  | { status: 'dead_letter'; reason: string };

export interface ResolveOpts {
  retry: RetryPolicy;
  sleep?: (ms: number) => Promise<void>;
  maxPolls?: number;
  pollIntervalMs?: number;
}

/**
 * Poll a persisted job to completion, then store its artifacts. Any provider/`JobRecord`
 * loaded from disk works — so a fresh process (after restart) can resolve a job it never
 * submitted. Transient poll errors go through backoff; fatal errors → dead-letter.
 */
export async function resolveVideoJob(
  vault: string,
  provider: Provider,
  rec: JobRecord,
  opts: ResolveOpts,
): Promise<ResolveOutcome> {
  if (!rec.job_handle) {
    rec.state = 'dead_letter';
    rec.last_error = 'no job_handle persisted';
    saveJob(vault, rec);
    return { status: 'dead_letter', reason: rec.last_error };
  }
  const sleep = opts.sleep ?? ((ms: number) => new Promise<void>((res) => setTimeout(res, ms)));
  const handle = { provider: rec.provider, handle: rec.job_handle };

  try {
    for (let i = 0; i < (opts.maxPolls ?? 200); i++) {
      const result = await withRetry(() => provider.poll(handle), opts.retry, { sleep });
      if (result.error) throw new Error(result.error.message);
      if (result.state === 'dead_letter') throw new Error('provider reported failure');
      if (result.state === 'succeeded') {
        const stored = await storeResult(vault, rec.meta, rec.request, result, rec.run_id);
        rec.state = 'succeeded';
        saveJob(vault, rec);
        return { status: 'stored', artifacts: stored };
      }
      rec.state = result.state;
      rec.attempts += 1;
      saveJob(vault, rec);
      await sleep(opts.pollIntervalMs ?? 1500);
    }
    return { status: 'pending' };
  } catch (e) {
    rec.state = 'dead_letter';
    rec.last_error = (e as Error).message;
    saveJob(vault, rec);
    return { status: 'dead_letter', reason: rec.last_error };
  }
}
