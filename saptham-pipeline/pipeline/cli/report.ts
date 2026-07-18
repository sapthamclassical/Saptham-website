/** `npm run report -- --scenes` — per-scene completeness (approved/published vs total required). */
import { join } from 'node:path';
import { openDb, sceneReport } from '../index';
import { loadRegistryScenes } from '../registry';

if (!process.argv.includes('--scenes')) {
  console.error('usage: report --scenes');
  process.exit(1);
}

const db = openDb(join('vault', 'index', 'catalog.db'));
const rows = sceneReport(db, loadRegistryScenes());
db.close();

console.log('# scene completeness  (generated/approved/published of total required)');
for (const s of rows) {
  const flag = s.ready ? '✓ ready' : '';
  console.log(
    `${s.scene_id}  ${(s.swara ?? '·').padEnd(3)} ${s.name.padEnd(26)} ` +
      `gen ${s.generated}/${s.total}  appr ${s.approved}  pub ${s.published}  ${flag}`,
  );
}
