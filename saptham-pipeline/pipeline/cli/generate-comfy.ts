/**
 * `npm run generate:comfy -- <ASSET_ID> [--enhance] [--ckpt name] [--steps N] [--seed N]`
 *
 * The FREE local generation path: compose (M2) → optional Ollama prompt-enhancement →
 * ComfyUI txt2img → M4 storage. Runs headless (HTTP), so no OpenArt credits are spent.
 */
import { loadDotenv } from '../canon/env';
import { loadCanonBundle } from '../canon/loader';
import { loadRegistryAssets } from '../registry';
import { loadCard, composeRequest } from '../prompt_engine';
import { metaFromAsset } from '../orchestration';
import { storeResult } from '../storage';
import { RunRecorder } from '../observability';
import { GenerationResultSchema } from '../domain';
import { OllamaClient } from '../providers/ollama-client';
import { ComfyClient } from '../providers/comfy-client';
import { buildTxt2ImgGraph, dimsForAspect } from '../providers/adapters/comfy-workflow';

loadDotenv();

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
const id = process.argv[2];
if (!id || id.startsWith('--')) {
  console.error('usage: generate:comfy <ASSET_ID> [--enhance] [--ckpt name] [--steps N] [--seed N]');
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
const comfy = new ComfyClient();

const health = await comfy.health();
if (!health.up) {
  console.error(`✗ ComfyUI not reachable (${health.detail}). Start it, then re-run. See: npm run doctor`);
  process.exit(1);
}

let positive = request.composed_prompt;
if (process.argv.includes('--enhance')) {
  console.log('… enhancing prompt via Ollama (local)');
  positive = await new OllamaClient().enhance(positive);
}

const { width, height } = dimsForAspect(request.aspect_ratio);
const seed = arg('seed') ? Number(arg('seed')) : Math.floor(Date.now() % 2_000_000_000);
const ckpt = arg('ckpt');
const graph = buildTxt2ImgGraph({
  prompt: positive, negative: request.negative_prompt, width, height, seed,
  steps: arg('steps') ? Number(arg('steps')) : undefined, ckpt, filenamePrefix: id,
});

console.log(`… submitting workflow to ComfyUI (${width}x${height}, seed ${seed})`);
const promptId = await comfy.submit(graph);
const images = await comfy.pollImages(promptId);
const bytes = await comfy.fetchImage(images[0]!);

const result = GenerationResultSchema.parse({
  request_id: request.request_id, provider: 'comfyui', model: ckpt ?? 'sdxl',
  state: 'succeeded', job_handle: null,
  artifacts: [{ bytesBase64: Buffer.from(bytes).toString('base64'), mime: 'image/png', seed_used: seed, variant_index: 0 }],
  revised_prompt: null, latency_ms: 0, cost: 0, raw_response_ref: null, error: null,
});

const runId = `run-${Date.now()}`;
const recorder = new RunRecorder('vault', runId, `generate:comfy ${id}`);
const stored = await storeResult('vault', meta, request, result, runId);
recorder.cost({ job_id: `${id}:v1`, provider: 'comfyui', model: ckpt ?? 'sdxl', units: 1, cost: 0 });
recorder.finalize([id], { provider: 'comfyui' }, 0);

console.log(`✓ generated ${id} locally (free) → ${stored.map((s) => s.variant).join(', ')}`);
console.log(`working: vault/assets/${meta.batch}/${meta.category}/${meta.asset_id}/${meta.version}/`);
