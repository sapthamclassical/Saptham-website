import { describe, it, expect, beforeAll } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { stringify } from 'yaml';
import { openDb, rebuildIndex, search, sceneReport } from '../pipeline/index';
import { planScene } from '../pipeline/orchestration';
import { loadRegistryScenes, loadRegistryAssets } from '../pipeline/registry';

/** Build a self-contained fixture vault: registry + one stored candidate artifact. */
function fixtureVault(): string {
  const vault = join(mkdtempSync(join(tmpdir(), 'saptham-idx-')), 'vault');
  mkdirSync(join(vault, 'registry'), { recursive: true });
  writeFileSync(join(vault, 'registry', 'assets.yaml'), stringify({ assets: [
    { id: 'LGT-01', name: 'Oil Lamp (Deepam) + Flame', category: 'lgt', batch: 'b07-lit-metal-hero', family: 'B', modality: 'image', priority: 'C', reuse: 'Global', can_3d: 'Y', derives_from: null, transparent_bg: true, resolution: '3840', sections_raw: [], static_animated: 'S+A', scenes: ['01'] },
    { id: 'KOL-01', name: 'Pulli Dot-Grid', category: 'kolam', batch: 'b02-kolam-borders-geometry', family: 'A', modality: 'vector-source', priority: 'C', reuse: 'Global', can_3d: 'N', derives_from: null, transparent_bg: true, resolution: 'vector', sections_raw: [], static_animated: 'S', scenes: [] },
  ] }));
  writeFileSync(join(vault, 'registry', 'scenes.yaml'), stringify({ scenes: [
    { id: '01', name: 'Pushpanjali', swara: 'Sa', order: 1, route: null, priority: 'H', required_assets: ['LGT-01', 'HERO-01'] },
  ] }));

  const dir = join(vault, 'assets', 'b07-lit-metal-hero', 'lgt', 'LGT-01', 'v1');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'var-01.json'), JSON.stringify({
    artifact_id: 'LGT-01:v1:var-01', content_hash: 'abc123def456', asset_id: 'LGT-01', version: 'v1', variant: 'var-01',
    path: 'vault/store/ab/abc123def456.jpg', mime: 'image/jpeg', status: 'candidate',
    provenance: { prompt_hash: 'ph', provider: 'openart', model: 'nano-banana-2-lite', seed: null, reference_ids: [], request_id: 'r', run_id: 'run-1' },
    acceptance: { passed: null, notes: '', reviewer: '', ts: null }, created_at: '2026-07-15T00:00:00Z',
  }));
  writeFileSync(join(vault, 'assets', 'b07-lit-metal-hero', 'lgt', 'LGT-01', 'asset.json'), JSON.stringify({
    asset_id: 'LGT-01', current: null,
    versions: [{ version: 'v1', status: 'candidate', parent: null, variants: ['var-01'], approved: null, prompt_hash: 'ph', run_id: 'run-1' }],
  }));
  return vault;
}

let vault: string;
beforeAll(() => {
  vault = fixtureVault();
  rebuildIndex(vault);
});

describe('M5 · index rebuild + search', () => {
  it('rebuilds assets, versions and artifacts from files alone', () => {
    const stats = rebuildIndex(vault); // idempotent: re-run reconstructs the same DB
    expect(stats.assets).toBe(2);
    expect(stats.versions).toBe(1);
    expect(stats.artifacts).toBe(1);
    expect(stats.scene_links).toBe(1); // only LGT-01 resolves; HERO-01 does not
  });

  it('facet search: by batch, family, and artifact status', () => {
    const db = openDb(join(vault, 'index', 'catalog.db'));
    expect(search(db, { batch: 'b07-lit-metal-hero' }).map((r) => r.asset_id)).toEqual(['LGT-01']);
    expect(search(db, { family: 'A' }).map((r) => r.asset_id)).toEqual(['KOL-01']);
    const cand = search(db, { status: 'candidate' });
    expect(cand[0]?.provider).toBe('openart');
    expect(cand[0]?.model).toBe('nano-banana-2-lite');
    db.close();
  });

  it('free-text FTS matches the asset name/subject', () => {
    const db = openDb(join(vault, 'index', 'catalog.db'));
    expect(search(db, { text: 'lamp' }).map((r) => r.asset_id)).toEqual(['LGT-01']);
    expect(search(db, { text: 'dot-grid' }).map((r) => r.asset_id)).toEqual(['KOL-01']);
    db.close();
  });

  it('scene report counts generated vs total required (unresolved counts toward total)', () => {
    const db = openDb(join(vault, 'index', 'catalog.db'));
    const rep = sceneReport(db, loadRegistryScenes(join(vault, 'registry')));
    const s01 = rep.find((s) => s.scene_id === '01');
    expect(s01?.total).toBe(2); // LGT-01 + HERO-01
    expect(s01?.generated).toBe(1); // only LGT-01 stored
    expect(s01?.ready).toBe(false);
    db.close();
  });

  it('scene planner resolves jobs and flags unresolved requirements', () => {
    const plan = planScene(loadRegistryScenes(join(vault, 'registry')), loadRegistryAssets(join(vault, 'registry')), '01');
    expect(plan?.jobs.map((j) => j.asset_id)).toEqual(['LGT-01']);
    expect(plan?.unresolved).toEqual(['HERO-01']);
  });
});
