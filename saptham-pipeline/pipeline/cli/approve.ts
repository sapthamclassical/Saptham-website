/** `npm run approve -- --asset <ID> --variant var-01 [--notes "..."] [--reviewer name]` */
import { loadCanonBundle } from '../canon/loader';
import { loadRegistryAssets } from '../registry';
import { metaFromAsset } from '../orchestration';
import { approveAsset } from '../review';

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const id = arg('asset');
const variant = arg('variant');
if (!id || !variant) {
  console.error('usage: approve --asset <ID> --variant <var-0N> [--notes "..."] [--reviewer name]');
  process.exit(1);
}

const { canon } = loadCanonBundle();
const asset = loadRegistryAssets().find((a) => a.id === id);
if (!asset || !asset.batch) {
  console.error(`unknown or unbatched asset: ${id}`);
  process.exit(1);
}

const notes = arg('notes') ?? `passes the 5-point acceptance test (${canon.acceptance_test.join(', ')})`;
const reviewer = arg('reviewer') ?? 'director';

approveAsset('vault', metaFromAsset(asset), variant, { passed: true, notes, reviewer });
console.log(`✓ approved ${id} ${variant}  (acceptance recorded by ${reviewer})`);
console.log(`  notes: ${notes}`);
