import { splitSections, pick, expandAssetList } from './markdown';
import { RegistrySceneSchema, type RegistryScene } from './schemas';

/** Parse the scene dossiers of STORYBOARD.md (`## SCENE NN — …`) into RegistryScene records. */
export function ingestScenes(storyboardMd: string): RegistryScene[] {
  const scenes: RegistryScene[] = [];
  for (const sec of splitSections(storyboardMd, 2)) {
    const head = sec.heading.match(/^SCENE\s+(\d+)\s+—\s+(.+)$/);
    if (!head) continue;
    const order = Number(head[1]);
    const name = head[2]!.replace(/\s*\(.*$/, '').replace(/\s*—.*$/, '').trim();

    const swara = pick(sec.body, /Color Accent:\*\*[^\n]*?\b(Sa|Ri|Ga|Ma|Pa|Da|Ni)\b/);
    const route = pick(sec.body, /route:\s*(\/[a-z-]+)/);
    const reqLine = pick(sec.body, /Required Assets:\*\*\s*(.+)/) ?? '';

    scenes.push(
      RegistrySceneSchema.parse({
        id: String(order).padStart(2, '0'),
        name,
        swara,
        order,
        route,
        priority: 'H', // storyboard has no explicit per-scene priority → placeholder (gap)
        required_assets: expandAssetList(reqLine),
      }),
    );
  }
  return scenes.sort((a, b) => a.order - b.order);
}
