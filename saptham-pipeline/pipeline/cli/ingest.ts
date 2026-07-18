/**
 * `npm run ingest [docsDir] [outDir]` — L2 ingestion.
 * Parses the design docs into vault/registry/{assets,scenes,batches}.yaml and a gap report.
 * Offline; no credentials.
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { stringify } from 'yaml';
import {
  readDoc, ingestAssets, ingestBatches, ingestScenes, joinRegistry, buildGapReport,
} from '../registry';

const docsDir = process.argv[2] ?? '../docs';
const outDir = process.argv[3] ?? 'vault/registry';

const { assets, skipped } = ingestAssets(readDoc(join(docsDir, 'MASTER_ASSET_INVENTORY.md')));
const batches = ingestBatches(readDoc(join(docsDir, 'ASSET_PRODUCTION_ROADMAP.md')));
const scenes = ingestScenes(readDoc(join(docsDir, 'STORYBOARD.md')));

const reg = joinRegistry(assets, batches, scenes);

writeFileSync(join(outDir, 'assets.yaml'), stringify({ assets: reg.assets }), 'utf8');
writeFileSync(join(outDir, 'batches.yaml'), stringify({ batches: reg.batches }), 'utf8');
writeFileSync(join(outDir, 'scenes.yaml'), stringify({ scenes: reg.scenes }), 'utf8');
writeFileSync(join(outDir, '_gaps.md'), buildGapReport(reg, skipped), 'utf8');

const joined = reg.assets.filter((a) => a.batch).length;
console.log(`✓ assets.yaml   — ${reg.assets.length} assets (${joined} joined to a batch)`);
console.log(`✓ batches.yaml  — ${reg.batches.length} batches`);
console.log(`✓ scenes.yaml   — ${reg.scenes.length} scenes`);
console.log(
  `✓ _gaps.md      — ${reg.gaps.canon_added_absent.length} CANON-added-absent, ` +
    `${reg.gaps.assets_without_batch.length} unbatched, ` +
    `${reg.gaps.unknown_scene_assets.length} unresolved scene refs`,
);
console.log(`\nM1 ingestion complete → ${outDir}/`);
