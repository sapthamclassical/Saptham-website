/** `npm run index:rebuild` — rebuild the derived catalog DB from files (offline). */
import { rebuildIndex } from '../index';

const vault = process.argv[2] ?? 'vault';
const stats = rebuildIndex(vault);
console.log(`✓ index rebuilt → ${vault}/index/catalog.db`);
console.log(
  `  assets=${stats.assets}  scene_links=${stats.scene_links}  versions=${stats.versions}  ` +
    `artifacts=${stats.artifacts}  runs=${stats.runs}  costs=${stats.costs}`,
);
