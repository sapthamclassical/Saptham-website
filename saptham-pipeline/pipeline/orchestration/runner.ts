import type { GenerationRequest, GenerationResult } from '../domain';
import type { Provider } from '../providers/base';
import { storeResult, alreadyStored, type AssetMeta, type StoredArtifact } from '../storage';
import { RunRecorder } from '../observability/run';
import { CircuitBreaker, withRetry, classifyError, type RetryPolicy, type RetryHooks } from './retry';

export type JobOutcome =
  | { status: 'stored'; artifacts: StoredArtifact[] }
  | { status: 'skipped'; reason: string }
  | { status: 'dead_letter'; reason: string };

export interface RunGenerateOpts {
  vault: string;
  provider: Provider;
  request: GenerationRequest;
  meta: AssetMeta;
  recorder: RunRecorder;
  retry: RetryPolicy;
  breaker: CircuitBreaker;
  force?: boolean;
  retryHooks?: RetryHooks;
}

/**
 * L5 single-asset runner: idempotency → (circuit-breaker) → submit-with-retry → store →
 * observability. On exhausted/fatal errors the job goes to the dead-letter queue rather
 * than crashing the run.
 */
export async function runGenerateJob(opts: RunGenerateOpts): Promise<JobOutcome> {
  const { vault, provider, request, meta, recorder, retry, breaker } = opts;
  const label = `${meta.asset_id}:${meta.version}`;

  if (!opts.force && alreadyStored(vault, meta)) {
    recorder.log({ level: 'info', asset_id: meta.asset_id, event: 'skip.idempotent', data: { label } });
    recorder.countJob(0);
    return { status: 'skipped', reason: 'already stored (idempotent); use force to regenerate' };
  }

  if (!breaker.canRequest()) {
    recorder.deadLetter({ asset_id: meta.asset_id, reason: 'circuit breaker open', provider: provider.id });
    recorder.countJob(0);
    return { status: 'dead_letter', reason: `circuit breaker open for ${provider.id}` };
  }

  let retries = 0;
  try {
    const result: GenerationResult = await withRetry(
      () => provider.submit(request),
      retry,
      { ...opts.retryHooks, onRetry: (n, info, delay) => {
        retries = n;
        recorder.log({ level: 'warn', asset_id: meta.asset_id, event: 'retry', data: { attempt: n, delay, message: info.message } });
        opts.retryHooks?.onRetry?.(n, info, delay);
      } },
    );

    breaker.recordSuccess();
    if (result.error) throw new Error(result.error.message);

    const stored = await storeResult(vault, meta, request, result, recorder.runId);
    recorder.cost({ job_id: label, provider: result.provider, model: result.model, units: result.artifacts.length, cost: result.cost });
    recorder.log({ level: 'info', asset_id: meta.asset_id, event: 'stored', data: { variants: stored.length, provider: result.provider, model: result.model } });
    recorder.countJob(retries);
    return { status: 'stored', artifacts: stored };
  } catch (err) {
    breaker.recordFailure();
    const info = classifyError(err);
    recorder.deadLetter({ asset_id: meta.asset_id, reason: info.message, retryable: info.retryable, provider: provider.id });
    recorder.log({ level: 'error', asset_id: meta.asset_id, event: 'dead_letter', data: { message: info.message } });
    recorder.countJob(retries);
    return { status: 'dead_letter', reason: info.message };
  }
}
