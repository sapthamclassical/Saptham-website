import type { DB } from './db';
import type { RegistryScene } from '../registry/schemas';

export interface SceneCompleteness {
  scene_id: string;
  name: string;
  swara: string | null;
  total: number; // required assets (incl. not-yet-registered)
  generated: number; // has any stored version
  approved: number;
  published: number;
  ready: boolean; // every required asset published
}

/** Per-scene completeness from the storyboard requirements + the index's version statuses. */
export function sceneReport(db: DB, scenes: RegistryScene[]): SceneCompleteness[] {
  const statusOf = db.prepare(
    `SELECT status FROM versions WHERE asset_id = ? ORDER BY
       CASE status WHEN 'published' THEN 0 WHEN 'approved' THEN 1 WHEN 'candidate' THEN 2 ELSE 3 END
     LIMIT 1`,
  );

  return scenes
    .map((s) => {
      let generated = 0, approved = 0, published = 0;
      for (const id of s.required_assets) {
        const row = statusOf.get(id) as { status: string } | undefined;
        if (!row) continue;
        generated += 1;
        if (row.status === 'approved') approved += 1;
        if (row.status === 'published') { approved += 1; published += 1; }
      }
      const total = s.required_assets.length;
      return { scene_id: s.id, name: s.name, swara: s.swara, total, generated, approved, published, ready: total > 0 && published === total };
    })
    .sort((a, b) => a.scene_id.localeCompare(b.scene_id));
}
