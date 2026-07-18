import type { DB } from './db';

export interface SearchQuery {
  id?: string;
  scene?: string;
  batch?: string;
  family?: string;
  category?: string;
  provider?: string;
  model?: string;
  status?: string; // artifact status
  text?: string; // free-text over composed_prompt/subject/negative (FTS5)
  limit?: number;
}

/**
 * Sanitize user free-text into a safe FTS5 MATCH expression: split on non-alphanumerics
 * and quote each token (implicit AND). Prevents `-`/`:`/`*` from being read as FTS operators
 * or column filters (e.g. "dot-grid" → `"dot" "grid"`).
 */
function ftsQuery(text: string): string {
  const tokens = text.match(/[\p{L}\p{N}]+/gu) ?? [];
  return tokens.map((t) => `"${t}"`).join(' ');
}

export interface SearchRow {
  asset_id: string;
  name: string;
  category: string;
  batch: string | null;
  family: string | null;
  version_status: string | null;
  artifact_status: string | null;
  provider: string | null;
  model: string | null;
  content_hash: string | null;
}

/** Facet + free-text search across the catalog. Free-text uses the FTS5 virtual table. */
export function search(db: DB, q: SearchQuery): SearchRow[] {
  const where: string[] = [];
  const params: unknown[] = [];

  const eq = (col: string, val?: string) => {
    if (val != null) { where.push(`${col} = ?`); params.push(val); }
  };
  eq('a.id', q.id);
  eq('a.batch', q.batch);
  eq('a.family', q.family);
  eq('a.category', q.category);
  eq('ar.provider', q.provider);
  eq('ar.model', q.model);
  eq('v.status', q.status); // authoritative lifecycle status lives on the version graph

  if (q.scene != null) {
    where.push('a.id IN (SELECT asset_id FROM scene_assets WHERE scene_id = ?)');
    params.push(q.scene);
  }
  if (q.text != null && q.text.trim()) {
    const fts = ftsQuery(q.text);
    if (fts) {
      where.push('a.id IN (SELECT asset_id FROM fts_prompts WHERE fts_prompts MATCH ?)');
      params.push(fts);
    }
  }

  const sql = `
    SELECT a.id AS asset_id, a.name, a.category, a.batch, a.family,
           v.status AS version_status, ar.status AS artifact_status,
           ar.provider, ar.model, ar.content_hash
    FROM assets a
    LEFT JOIN versions v ON v.asset_id = a.id
    LEFT JOIN artifacts ar ON ar.asset_id = a.id AND ar.version = v.version
    ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
    ORDER BY a.id
    LIMIT ?`;
  params.push(q.limit ?? 200);

  return db.prepare(sql).all(...params) as SearchRow[];
}
