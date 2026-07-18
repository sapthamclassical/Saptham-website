/**
 * `npm run video:loop -- --from <STILL_ASSET> --as <VIDEO_ASSET> [--seconds 8]`
 * FREE ambient hero loop: takes an existing still and renders a seamless push-in loop
 * with FFmpeg (no GPU, no credits), stored as the target video asset via M4.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { loadDotenv } from '../canon/env';
import { loadCanonBundle } from '../canon/loader';
import { loadRegistryAssets } from '../registry';
import { loadCard, composeRequest } from '../prompt_engine';
import { metaFromAsset } from '../orchestration';
import { storeResult, workingDir } from '../storage';
import { RunRecorder } from '../observability';
import { GenerationResultSchema } from '../domain';
import { FfmpegClient } from '../providers/ffmpeg-client';

loadDotenv();

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
const from = arg('from');
const as = arg('as');
const seconds = arg('seconds') ? Number(arg('seconds')) : 8;
if (!from || !as) {
  console.error('usage: video:loop --from <STILL_ASSET_ID> --as <VIDEO_ASSET_ID> [--seconds 8]');
  process.exit(1);
}

const { canon } = loadCanonBundle();
const assets = loadRegistryAssets();
const src = assets.find((a) => a.id === from);
const tgt = assets.find((a) => a.id === as);
if (!src?.batch) { console.error(`unknown/unbatched source: ${from}`); process.exit(1); }
if (!tgt?.batch) { console.error(`unknown/unbatched target: ${as}`); process.exit(1); }

const srcMeta = metaFromAsset(src);
const srcDir = workingDir('vault', srcMeta.batch, srcMeta.category, src.id, 'v1');
const still = readdirSync(srcDir).find((f) => /^var-01\.(png|jpe?g|webp)$/i.test(f));
if (!still) { console.error(`no source still found at ${srcDir}`); process.exit(1); }
const input = join(srcDir, still);

const ffmpeg = new FfmpegClient();
const health = await ffmpeg.version();
if (!health.up) { console.error(`FFmpeg not available: ${health.detail}`); process.exit(1); }

const output = join(tmpdir(), `saptham-loop-${as}.mp4`);
console.log(`… rendering ${seconds}s ambient loop from ${from} (${still}) via FFmpeg — free, no GPU`);
await ffmpeg.ambientLoop(input, output, { seconds });
const dur = await ffmpeg.duration(output);

const tgtMeta = metaFromAsset(tgt);
const request = composeRequest(loadCard(as, tgt.batch), tgt, canon);
const result = GenerationResultSchema.parse({
  request_id: request.request_id, provider: 'ffmpeg', model: 'ambient-loop', state: 'succeeded', job_handle: null,
  artifacts: [{ bytesBase64: Buffer.from(readFileSync(output)).toString('base64'), mime: 'video/mp4', seed_used: null, variant_index: 0 }],
  revised_prompt: null, latency_ms: 0, cost: 0, raw_response_ref: null, error: null,
});

const runId = `run-${Date.now()}`;
const rec = new RunRecorder('vault', runId, `video:loop ${as} from ${from}`);
const stored = await storeResult('vault', tgtMeta, request, result, runId);
rec.cost({ job_id: `${as}:v1`, provider: 'ffmpeg', model: 'ambient-loop', units: 1, cost: 0 });
rec.finalize([as], { provider: 'ffmpeg', source: from }, 0);

console.log(`✓ ${as} ambient loop stored (FREE, ${dur.toFixed(1)}s) → ${stored.map((s) => s.variant).join(', ')}`);
console.log(`working: vault/assets/${tgtMeta.batch}/${tgtMeta.category}/${tgtMeta.asset_id}/v1/`);
