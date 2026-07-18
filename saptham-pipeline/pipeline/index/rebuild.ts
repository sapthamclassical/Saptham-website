import { readdirSync, existsSync, rmSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { openDb, type DB } from './db';
import { readJson } from '../storage/content-store';
import { loadRegistryAssets, loadRegistryScenes } from '../registry';
import { loadCanonBundle } from '../canon/loader';
import { loadCard, composeRequest } from '../prompt_engine';
import type { Artifact, AssetVersion, RunManifest } from '../domain';

export interface RebuildStats {
  assets: number;
  scene_links: number;
  versions: number;
  artifacts: number;
  runs: number;
  costs: number;
}

function walkJson(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return (readdirSync(dir, { recursive: true }) as string[])
    .filter((f) => typeof f === 'string' && f.endsWith('.json'))
    .map((f) => join(dir, f));
}

/** Rebuild the derived catalog DB entirely from files (registry + sidecars + runs). */
export function rebuildIndex(vault = 'vault', dbPath = join(vault, 'index', 'catalog.db')): RebuildStats {
  for (const suffix of ['', '-wal', '-shm']) rmSync(dbPath + suffix, { force: true });
  const db: DB = openDb(dbPath);

  const assets = loadRegistryAssets(join(vault, 'registry'));
  const scenes = safe(() => loadRegistryScenes(join(vault, 'registry'))) ?? [];
  const canon = safe(() => loadCanonBundle(join(vault, 'canon')).canon);

  const stats: RebuildStats = { assets: 0, scene_links: 0, versions: 0, artifacts: 0, runs: 0, costs: 0 };

  const insertAsset = db.prepare(
    `INSERT OR REPLACE INTO assets(id,name,category,batch,family,modality,priority,reuse,derives_from)
     VALUES (@id,@name,@category,@batch,@family,@modality,@priority,@reuse,@derives_from)`,
  );
  const insertScene = db.prepare('INSERT INTO scene_assets(scene_id,asset_id) VALUES (?,?)');
  const insertFts = db.prepare('INSERT INTO fts_prompts(asset_id,composed_prompt,subject,negative) VALUES (?,?,?,?)');
  const insertVersion = db.prepare(
    `INSERT INTO versions(asset_id,version,status,approved_variant,prompt_hash,run_id,parent)
     VALUES (@asset_id,@version,@status,@approved_variant,@prompt_hash,@run_id,@parent)`,
  );
  const insertArtifact = db.prepare(
    `INSERT OR REPLACE INTO artifacts(content_hash,asset_id,version,variant,path,mime,width,height,duration,status,provider,model,seed,cost,created_at)
     VALUES (@content_hash,@asset_id,@version,@variant,@path,@mime,@width,@height,@duration,@status,@provider,@model,@seed,@cost,@created_at)`,
  );
  const insertRun = db.prepare(
    `INSERT OR REPLACE INTO runs(run_id,ts,target,cost_total,job_count,retry_count,dlq_count)
     VALUES (@run_id,@ts,@target,@cost_total,@job_count,@retry_count,@dlq_count)`,
  );
  const insertCost = db.prepare(
    'INSERT INTO costs(run_id,job_id,provider,model,units,cost,ts) VALUES (@run_id,@job_id,@provider,@model,@units,@cost,@ts)',
  );

  db.transaction(() => {
    // assets + FTS
    for (const a of assets) {
      insertAsset.run({
        id: a.id, name: a.name, category: a.category, batch: a.batch, family: a.family,
        modality: a.modality, priority: a.priority, reuse: a.reuse, derives_from: a.derives_from,
      });
      stats.assets += 1;

      let composed = '', subject = a.name, negative = '';
      const cardPath = a.batch ? join(vault, 'cards', a.batch, `${a.id}.yaml`) : '';
      if (canon && a.batch && cardPath && existsSync(cardPath)) {
        const req = safe(() => composeRequest(loadCard(a.id, a.batch!, join(vault, 'cards')), a, canon));
        const card = safe(() => loadCard(a.id, a.batch!, join(vault, 'cards')));
        if (req && card) { composed = req.composed_prompt; subject = card.subject; negative = req.negative_prompt; }
      }
      insertFts.run(a.id, composed, subject, negative);
    }

    // scene → asset links (resolved only)
    const assetIds = new Set(assets.map((a) => a.id));
    for (const s of scenes) {
      for (const id of s.required_assets) {
        if (assetIds.has(id)) { insertScene.run(s.id, id); stats.scene_links += 1; }
      }
    }

    // versions + artifacts from sidecars
    for (const file of walkJson(join(vault, 'assets'))) {
      const obj = readJson<Record<string, unknown>>(file);
      if (!obj) continue;
      if ('content_hash' in obj) {
        const art = obj as unknown as Artifact;
        insertArtifact.run({
          content_hash: art.content_hash, asset_id: art.asset_id, version: art.version, variant: art.variant,
          path: art.path, mime: art.mime, width: art.width ?? null, height: art.height ?? null,
          duration: art.duration ?? null, status: art.status, provider: art.provenance.provider,
          model: art.provenance.model, seed: art.provenance.seed ?? null, cost: null, created_at: art.created_at,
        });
        stats.artifacts += 1;
      } else if ('versions' in obj) {
        const av = obj as unknown as AssetVersion;
        for (const v of av.versions) {
          insertVersion.run({
            asset_id: av.asset_id, version: v.version, status: v.status,
            approved_variant: v.approved ?? null, prompt_hash: v.prompt_hash ?? null,
            run_id: v.run_id ?? null, parent: v.parent ?? null,
          });
          stats.versions += 1;
        }
      }
    }

    // runs + costs
    const runsDir = join(vault, 'runs');
    if (existsSync(runsDir)) {
      for (const rid of readdirSync(runsDir)) {
        const mf = join(runsDir, rid, 'manifest.json');
        const m = readJson<RunManifest>(mf);
        if (m) {
          insertRun.run({
            run_id: m.run_id, ts: m.ts, target: m.target, cost_total: m.totals.cost,
            job_count: m.totals.count, retry_count: m.totals.retries, dlq_count: m.dlq_count,
          });
          stats.runs += 1;
        }
        const cf = join(runsDir, rid, 'costs.jsonl');
        if (existsSync(cf)) {
          for (const line of readFileSync(cf, 'utf8').split(/\r?\n/).filter(Boolean)) {
            const c = JSON.parse(line);
            insertCost.run({ run_id: c.run_id, job_id: c.job_id, provider: c.provider, model: c.model, units: c.units, cost: c.cost, ts: c.ts });
            stats.costs += 1;
          }
        }
      }
    }
  })();

  db.close();
  return stats;
}

function safe<T>(fn: () => T): T | null {
  try {
    return fn();
  } catch {
    return null;
  }
}
