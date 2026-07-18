import { relative } from 'node:path';
import { join } from 'node:path';
import { writeJson } from '../storage/content-store';
import { mkdirSync, writeFileSync } from 'node:fs';
import type { DB } from '../index/db';
import { search } from '../index/query';

/** Generate a local HTML contact-sheet for visual review (reads the index). */
export function generateContactSheet(db: DB, vault: string, outDir: string): string {
  const rows = search(db, { limit: 500 }).filter((r) => r.content_hash);
  const cards = rows
    .map((r) => {
      // best-effort thumbnail: the working variant lives beside the asset tree
      const rel = relative(outDir, join(vault, 'assets')).replace(/\\/g, '/');
      const img = `${rel}/${r.batch}/${r.category}/${r.asset_id}/v1/`;
      return `<figure>
  <div class="thumb" data-hint="${img}"></div>
  <figcaption><b>${r.asset_id}</b> · ${r.artifact_status ?? ''}<br>${r.provider ?? ''}/${r.model ?? ''}<br><code>${(r.content_hash ?? '').slice(0, 12)}</code></figcaption>
</figure>`;
    })
    .join('\n');

  const html = `<!doctype html><meta charset="utf-8"><title>Saptham — Review</title>
<style>
  body{background:#0E0B08;color:#F4EDE0;font:14px/1.5 system-ui;margin:24px}
  h1{color:#C9A24B;font-weight:600}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px}
  figure{margin:0;background:#171310;border:1px solid #2A241D;border-radius:8px;padding:12px}
  .thumb{aspect-ratio:1;background:#0E0B08;border:1px dashed #2A241D;border-radius:4px;margin-bottom:8px}
  code{color:#8A6A25}
</style>
<h1>Saptham — Review contact sheet</h1>
<p>${rows.length} stored artifact(s). Open the working folder shown in each card to inspect the image.</p>
<div class="grid">${cards}</div>`;

  mkdirSync(outDir, { recursive: true });
  const out = join(outDir, 'contact-sheet.html');
  writeFileSync(out, html, 'utf8');
  writeJson(join(outDir, 'index.json'), rows);
  return out;
}
