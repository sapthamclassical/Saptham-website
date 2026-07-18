/** L7 Index schema (DATA_MODELS §11). Derived + rebuildable — files remain the source of truth. */
export const SCHEMA = `
CREATE TABLE IF NOT EXISTS assets (
  id TEXT PRIMARY KEY, name TEXT, category TEXT, batch TEXT, family TEXT,
  modality TEXT, priority TEXT, reuse TEXT, derives_from TEXT
);
CREATE TABLE IF NOT EXISTS scene_assets (scene_id TEXT, asset_id TEXT);
CREATE TABLE IF NOT EXISTS versions (
  asset_id TEXT, version TEXT, status TEXT, approved_variant TEXT,
  prompt_hash TEXT, run_id TEXT, parent TEXT
);
CREATE TABLE IF NOT EXISTS artifacts (
  content_hash TEXT PRIMARY KEY, asset_id TEXT, version TEXT, variant TEXT, path TEXT, mime TEXT,
  width INTEGER, height INTEGER, duration REAL, status TEXT, provider TEXT, model TEXT,
  seed INTEGER, cost REAL, created_at TEXT
);
CREATE TABLE IF NOT EXISTS runs (
  run_id TEXT PRIMARY KEY, ts TEXT, target TEXT,
  cost_total REAL, job_count INTEGER, retry_count INTEGER, dlq_count INTEGER
);
CREATE TABLE IF NOT EXISTS costs (
  id INTEGER PRIMARY KEY AUTOINCREMENT, run_id TEXT, job_id TEXT,
  provider TEXT, model TEXT, units REAL, cost REAL, ts TEXT
);
CREATE VIRTUAL TABLE IF NOT EXISTS fts_prompts USING fts5(asset_id UNINDEXED, composed_prompt, subject, negative);
CREATE INDEX IF NOT EXISTS idx_artifacts_asset ON artifacts(asset_id);
CREATE INDEX IF NOT EXISTS idx_versions_asset ON versions(asset_id);
CREATE INDEX IF NOT EXISTS idx_scene_assets ON scene_assets(scene_id, asset_id);
`;
