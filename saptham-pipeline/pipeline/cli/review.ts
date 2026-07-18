/** `npm run review` — generate a local HTML contact-sheet from the index for visual review. */
import { join } from 'node:path';
import { openDb } from '../index';
import { generateContactSheet } from '../review';

const db = openDb(join('vault', 'index', 'catalog.db'));
const out = generateContactSheet(db, 'vault', join('vault', 'review', 'catalog'));
db.close();
console.log(`✓ contact sheet → ${out}`);
