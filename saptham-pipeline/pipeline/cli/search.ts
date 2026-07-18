/** `npm run search -- [--batch b07…] [--family B] [--status candidate] [--provider openart] [--scene 06] [--text "lamp"]` */
import { join } from 'node:path';
import { openDb, search, type SearchQuery } from '../index';

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const q: SearchQuery = {
  id: arg('id'), scene: arg('scene'), batch: arg('batch'), family: arg('family'),
  category: arg('category'), provider: arg('provider'), model: arg('model'),
  status: arg('status'), text: arg('text'), limit: arg('limit') ? Number(arg('limit')) : undefined,
};

const db = openDb(join('vault', 'index', 'catalog.db'));
const rows = search(db, q);
db.close();

console.log(`# ${rows.length} result(s)`);
for (const r of rows) {
  const art = r.content_hash ? ` [${r.artifact_status} ${r.provider}/${r.model} ${r.content_hash.slice(0, 8)}]` : '';
  console.log(`${r.asset_id.padEnd(9)} ${(r.family ?? '·').padEnd(10)} ${(r.batch ?? '·').padEnd(28)} ${r.name}${art}`);
}
