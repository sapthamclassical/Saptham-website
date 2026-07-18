import type { RegistryAsset, RegistryScene } from '../registry/schemas';

export interface SceneJob {
  asset_id: string;
  batch: string | null;
  family: string | null;
  priority: string;
  resolved: boolean; // exists in the registry
}

export interface ScenePlan {
  scene_id: string;
  name: string;
  swara: string | null;
  jobs: SceneJob[];
  unresolved: string[]; // required but not registered (CANON-added gaps)
}

/** Expand a storyboard scene into its asset job list (single scene; anchor-first ordering is applied at run time). */
export function planScene(scenes: RegistryScene[], assets: RegistryAsset[], sceneId: string): ScenePlan | null {
  const scene = scenes.find((s) => s.id === sceneId);
  if (!scene) return null;
  const byId = new Map(assets.map((a) => [a.id, a]));
  const jobs: SceneJob[] = [];
  const unresolved: string[] = [];

  for (const id of scene.required_assets) {
    const a = byId.get(id);
    if (!a) { unresolved.push(id); continue; }
    jobs.push({ asset_id: a.id, batch: a.batch, family: a.family, priority: a.priority, resolved: true });
  }
  // Critical first, then by id — a lightweight production ordering.
  const rank: Record<string, number> = { C: 0, H: 1, M: 2, L: 3 };
  jobs.sort((x, y) => (rank[x.priority] ?? 9) - (rank[y.priority] ?? 9) || x.asset_id.localeCompare(y.asset_id));

  return { scene_id: scene.id, name: scene.name, swara: scene.swara, jobs, unresolved };
}
