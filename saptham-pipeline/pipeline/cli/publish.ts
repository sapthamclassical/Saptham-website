/** `npm run publish -- --asset <ID>` — publish the approved variant to vault/delivery (gated). */
import { loadRegistryAssets } from '../registry';
import { metaFromAsset } from '../orchestration';
import { publishAsset, STYLE_ANCHOR_ID } from '../review';

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const id = arg('asset');
if (!id) {
  console.error('usage: publish --asset <ID>');
  process.exit(1);
}

const assets = loadRegistryAssets();
const asset = assets.find((a) => a.id === id);
if (!asset || !asset.batch) {
  console.error(`unknown or unbatched asset: ${id}`);
  process.exit(1);
}

const anchor = assets.find((a) => a.id === STYLE_ANCHOR_ID);
const anchorMeta = anchor && anchor.batch ? metaFromAsset(anchor) : null;

try {
  const res = publishAsset('vault', metaFromAsset(asset), { priority: asset.priority, anchorMeta });
  console.log(`✓ published ${id} ${res.variant} → ${res.deliveryFile}`);
} catch (e) {
  console.error(`✗ publish blocked: ${(e as Error).message}`);
  process.exit(1);
}
