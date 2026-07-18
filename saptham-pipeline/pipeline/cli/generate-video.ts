/**
 * `npm run generate:video <ASSET_ID>` — async video generation (offline FakeAsyncProvider).
 * Demonstrates submit→persist(durable job)→poll→fetch→store. Real MCP video providers
 * (Seedance/Kling/Veo via OpenArt) are agent-bridged; the durable job store is shared.
 */
import { loadCanonBundle } from '../canon/loader';
import { loadRegistryAssets } from '../registry';
import { loadCard, composeRequest } from '../prompt_engine';
import { metaFromAsset, submitVideoJob, resolveVideoJob } from '../orchestration';
import { FakeAsyncProvider } from '../providers/base';
import { RunRecorder } from '../observability';

const id = process.argv[2];
if (!id || id.startsWith('--')) {
  console.error('usage: generate:video <ASSET_ID>');
  process.exit(1);
}

const { canon, policy } = loadCanonBundle();
const asset = loadRegistryAssets().find((a) => a.id === id);
if (!asset || !asset.batch) {
  console.error(`unknown or unbatched asset: ${id}`);
  process.exit(1);
}
if (asset.modality !== 'video') {
  console.error(`${id} is not a video asset (modality=${asset.modality})`);
  process.exit(1);
}

const request = composeRequest(loadCard(id, asset.batch), asset, canon);
const meta = metaFromAsset(asset);
const provider = new FakeAsyncProvider(2);
const runId = `run-${Date.now()}`;
const recorder = new RunRecorder('vault', runId, `generate:video ${id}`);
const retry = { maxAttempts: policy.retry.max_attempts, baseMs: policy.retry.backoff_base_ms, jitter: policy.retry.jitter };

const job = await submitVideoJob('vault', provider, request, meta, { runId, jobId: `job-${Date.now()}`, createdAt: new Date().toISOString() });
console.log(`… submitted async job ${job.job_id} (state=${job.state}, handle=${job.job_handle})`);

const outcome = await resolveVideoJob('vault', provider, job, { retry, pollIntervalMs: 200 });
recorder.finalize([id], { provider: provider.id }, 0);

console.log(`status: ${outcome.status}`);
if (outcome.status === 'stored') {
  console.log(`✓ video stored → vault/assets/${meta.batch}/${meta.category}/${meta.asset_id}/${meta.version}/${outcome.artifacts.map((a) => a.variant).join(', ')}`);
}
