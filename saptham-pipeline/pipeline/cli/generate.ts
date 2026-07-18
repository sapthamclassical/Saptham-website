/**
 * `npm run generate <ASSET_ID> [--force]` — end-to-end single-asset generation.
 * Offline by default on FakeProvider (no credentials, no credits). Real MCP providers
 * are agent-bridged, so live generation is driven from the agent, not this headless CLI.
 */
import { loadCanonBundle } from '../canon/loader';
import { loadRegistryAssets } from '../registry';
import { loadCard, composeRequest } from '../prompt_engine';
import { FakeProvider } from '../providers/base';
import { CircuitBreaker, metaFromAsset, runGenerateJob } from '../orchestration';
import { RunRecorder } from '../observability';

const args = process.argv.slice(2);
const id = args.find((a) => !a.startsWith('--'));
const force = args.includes('--force');
const vault = 'vault';

if (!id) {
  console.error('usage: generate <ASSET_ID> [--force]');
  process.exit(1);
}

const { canon, policy } = loadCanonBundle();
const asset = loadRegistryAssets().find((a) => a.id === id);
if (!asset) {
  console.error(`unknown asset: ${id}`);
  process.exit(1);
}
if (!asset.batch) {
  console.error(`${id} is unbatched — resolve in vault/registry/_gaps.md first`);
  process.exit(1);
}

const card = loadCard(id, asset.batch);
const request = composeRequest(card, asset, canon);
const meta = metaFromAsset(asset);
const provider = new FakeProvider();
const runId = `run-${Date.now()}`;
const recorder = new RunRecorder(vault, runId, `--asset ${id}`);
const breaker = new CircuitBreaker(policy.circuit_breaker.failures_to_open, policy.circuit_breaker.cooldown_ms);
const retry = { maxAttempts: policy.retry.max_attempts, baseMs: policy.retry.backoff_base_ms, jitter: policy.retry.jitter };

const t0 = Date.now();
const outcome = await runGenerateJob({ vault, provider, request, meta, recorder, retry, breaker, force });
const manifest = recorder.finalize([meta.asset_id], { provider: provider.id }, Date.now() - t0);

console.log(`# generate ${id}  (provider=${provider.id}, run=${runId})`);
console.log(`status: ${outcome.status}`);
if (outcome.status === 'stored') {
  console.log(`variants: ${outcome.artifacts.map((a) => a.variant).join(', ')}`);
  console.log(`working: vault/assets/${meta.batch}/${meta.category}/${meta.asset_id}/${meta.version}/`);
}
console.log(`manifest: ${recorder.dir}/manifest.json  (cost=${manifest.totals.cost}, dlq=${manifest.dlq_count})`);
