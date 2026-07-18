/**
 * `npm run generate:gemini <ASSET_ID>` — free-tier cloud image path via Gemini.
 * compose (M2) → Gemini image (Nano Banana) → M4 storage. No OpenArt credits spent.
 */
import { loadDotenv } from '../canon/env';
import { loadCanonBundle } from '../canon/loader';
import { loadRegistryAssets } from '../registry';
import { loadCard, composeRequest, foldNegatives } from '../prompt_engine';
import { metaFromAsset } from '../orchestration';
import { storeResult } from '../storage';
import { RunRecorder } from '../observability';
import { GenerationResultSchema } from '../domain';
import { GeminiClient } from '../providers/gemini-client';

loadDotenv();

const id = process.argv[2];
if (!id || id.startsWith('--')) {
  console.error('usage: generate:gemini <ASSET_ID>');
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
const client = new GeminiClient();

const health = await client.health();
if (!health.up) {
  console.error(`✗ Gemini not available (${health.detail})`);
  process.exit(1);
}

const model = 'gemini-2.5-flash-image';
let img;
try {
  img = await client.generateImage(foldNegatives(request), { aspectRatio: request.aspect_ratio });
} catch (e) {
  console.error(`✗ ${(e as Error).message}`);
  process.exit(1);
}

const result = GenerationResultSchema.parse({
  request_id: request.request_id, provider: 'gemini', model,
  state: 'succeeded', job_handle: null,
  artifacts: [{ bytesBase64: Buffer.from(img.bytes).toString('base64'), mime: img.mime, seed_used: null, variant_index: 0 }],
  revised_prompt: null, latency_ms: 0, cost: 0, raw_response_ref: null, error: null,
});

const runId = `run-${Date.now()}`;
const recorder = new RunRecorder('vault', runId, `generate:gemini ${id}`);
const stored = await storeResult('vault', meta, request, result, runId);
recorder.cost({ job_id: `${id}:v1`, provider: 'gemini', model, units: 1, cost: 0 });
recorder.finalize([id], { provider: 'gemini' }, 0);

console.log(`✓ generated ${id} via Gemini (free) → ${stored.map((s) => s.variant).join(', ')}`);
console.log(`working: vault/assets/${meta.batch}/${meta.category}/${meta.asset_id}/${meta.version}/`);
