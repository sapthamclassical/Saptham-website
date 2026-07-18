/**
 * `npm run store:external -- --asset <ID> --model <M> --uri <URL> [--seed N] [--provider openart]`
 *
 * Persists an artifact that was generated live by the AGENT via an MCP provider (which
 * headless Node cannot call) through the M4 storage layer: the real composed request +
 * the live image → content-addressed store + sidecar + version graph. This is the
 * agent-bridge for MCP providers.
 */
import { loadCanonBundle } from '../canon/loader';
import { loadRegistryAssets } from '../registry';
import { loadCard, composeRequest } from '../prompt_engine';
import { GenerationResultSchema } from '../domain';
import { metaFromAsset } from '../orchestration';
import { storeResult } from '../storage';
import { RunRecorder } from '../observability';

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

function mimeFromUri(u: string): string {
  const ext = u.split('?')[0]!.split('.').pop()?.toLowerCase() ?? '';
  const map: Record<string, string> = {
    jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', mp4: 'video/mp4', webm: 'video/webm',
  };
  return map[ext] ?? 'image/png';
}

const id = arg('asset');
const uri = arg('uri');
const model = arg('model') ?? 'unknown';
const provider = arg('provider') ?? 'openart';
const seed = arg('seed') ? Number(arg('seed')) : null;
const vault = 'vault';

if (!id || !uri) {
  console.error('usage: store:external --asset <ID> --model <M> --uri <URL> [--seed N] [--provider openart]');
  process.exit(1);
}

const { canon } = loadCanonBundle();
const asset = loadRegistryAssets().find((a) => a.id === id);
if (!asset || !asset.batch) {
  console.error(`unknown or unbatched asset: ${id}`);
  process.exit(1);
}

const request = composeRequest(loadCard(id, asset.batch), asset, canon);
const meta = metaFromAsset(asset);

const result = GenerationResultSchema.parse({
  request_id: request.request_id,
  provider,
  model,
  state: 'succeeded',
  job_handle: null,
  artifacts: [{ uri, mime: mimeFromUri(uri), seed_used: seed, variant_index: 0 }],
  revised_prompt: null,
  latency_ms: 0,
  cost: 0,
  raw_response_ref: null,
  error: null,
});

const runId = `run-${Date.now()}`;
const recorder = new RunRecorder(vault, runId, `store:external ${id}`);

const stored = await storeResult(vault, meta, request, result, runId);
recorder.log({ level: 'info', asset_id: id, event: 'stored.external', data: { provider, model, variants: stored.length } });
recorder.cost({ job_id: `${id}:v1`, provider, model, units: stored.length, cost: 0 });
recorder.finalize([id], { provider }, 0);

console.log(`# stored live ${id} via ${provider}/${model}`);
for (const s of stored) console.log(`  ${s.variant}  hash=${s.content_hash.slice(0, 12)}…  ${s.path}`);
console.log(`working: vault/assets/${meta.batch}/${meta.category}/${meta.asset_id}/${meta.version}/`);
console.log(`prompt_hash: ${request.prompt_hash}`);
