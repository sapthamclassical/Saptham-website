/**
 * `npm run compose <ASSET_ID> [--scene NN]` — dry-run the Prompt Engine.
 * Prints the exact composed prompt, negatives, references and prompt_hash. Offline.
 */
import { loadCanonBundle } from '../canon/loader';
import { loadRegistryAssets, loadRegistryScenes } from '../registry';
import { loadCard, composeRequest, foldNegatives } from '../prompt_engine';

const args = process.argv.slice(2);
const id = args[0];
const sceneIdx = args.indexOf('--scene');
const sceneId = sceneIdx >= 0 ? args[sceneIdx + 1] : undefined;

if (!id || id.startsWith('--')) {
  console.error('usage: compose <ASSET_ID> [--scene NN]');
  process.exit(1);
}

const { canon } = loadCanonBundle();
const asset = loadRegistryAssets().find((a) => a.id === id);
if (!asset) {
  console.error(`unknown asset: ${id}`);
  process.exit(1);
}
if (!asset.batch) {
  console.error(`${id} is unbatched — no card location; resolve it in vault/registry/_gaps.md first`);
  process.exit(1);
}

let sceneSwara: string | null = null;
if (sceneId) {
  const s = loadRegistryScenes().find((x) => x.id === sceneId);
  sceneSwara = s?.swara ?? null;
}

const card = loadCard(id, asset.batch);
const req = composeRequest(card, asset, canon, { sceneSwara, sceneId });

console.log(`# compose ${id}  (batch ${asset.batch} · family ${asset.family} · modality ${asset.modality})`);
console.log(`\n## composed_prompt\n${req.composed_prompt}`);
console.log(`\n## negative_prompt\n${req.negative_prompt || '(none)'}`);
console.log(
  `\n## aspect_ratio ${req.aspect_ratio}  ·  resolution ${req.resolution || '(unset)'}  ·  variants ${req.num_variants}`,
);
console.log(`## references  ${req.reference_images.map((r) => `${r.id}(${r.role})`).join(', ')}`);
console.log(`## prompt_hash ${req.prompt_hash}`);
console.log(`\n## provider-folded (engines without a native negative field)\n${foldNegatives(req)}`);
