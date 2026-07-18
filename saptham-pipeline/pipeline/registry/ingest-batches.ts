import { splitSections, pick, expandAssetList } from './markdown';
import { RegistryBatchSchema, type RegistryBatch } from './schemas';

function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .split('-')
    .slice(0, 3)
    .join('-');
}

function classifyFamily(heading: string): string {
  const fam = pick(heading, /Family\s+([A-C])/);
  if (fam === 'C') {
    if (/TEXTURE/i.test(heading)) return 'C-tex';
    if (/PARTICLE|SPRITE/i.test(heading)) return 'C-particle';
    return 'C';
  }
  if (fam) return fam;
  if (/Camera|Photograph/i.test(heading)) return 'photo';
  if (/Assembly|Derived/i.test(heading)) return 'assembly';
  if (/\b3D\b/.test(heading)) return '3D';
  if (/gate|prerequisite/i.test(heading)) return 'ref';
  return '?';
}

/** Parse ASSET_PRODUCTION_ROADMAP.md batch sections into RegistryBatch records. */
export function ingestBatches(roadmapMd: string): RegistryBatch[] {
  const batches: RegistryBatch[] = [];
  for (const sec of splitSections(roadmapMd, 1)) {
    const m = sec.heading.match(/^BATCH\s+(\d+)\s+·\s+(.+)$/);
    if (!m) continue;
    const order = Number(m[1]);
    const name = m[2]!.replace(/\s*\*\(.*$/, '').trim();
    const includedLine = pick(sec.body, /\*\*Assets Included:\*\*\s*(.+)/) ?? '';
    const members = expandAssetList(includedLine);
    batches.push(
      RegistryBatchSchema.parse({
        id: `b${String(order).padStart(2, '0')}-${slug(name)}`,
        name,
        family: classifyFamily(sec.heading),
        order,
        anchor_asset: null, // anchors are described by name in the roadmap → hand-assign (gap)
        members,
      }),
    );
  }
  return batches;
}
