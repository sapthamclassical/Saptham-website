import { splitSections, parseTable, pick } from './markdown';
import { RegistryAssetSchema, type RegistryAsset } from './schemas';
import type { Modality } from '../domain';

const TYPE_TO_MODALITY: Record<string, Modality> = {
  SVG: 'vector-source',
  '2D': 'image',
  '3D': '3d-ref',
  VID: 'video',
};

function mapTransparent(v: string | null): boolean | 'variant' {
  if (v === 'Y') return true;
  if (v === 'N') return false;
  if (v === '~') return 'variant';
  return false;
}

interface CatDefaults {
  type: string;
  transparent: string | null;
  resolution: string;
  reuse: string;
  can3d: string;
}

function categoryDefaults(body: string): CatDefaults {
  const line = body.split(/\r?\n/).find((l) => l.includes('Category defaults:')) ?? '';
  return {
    type: pick(line, /(?<!Can.)\b(SVG|2D|3D|VID)\b/) ?? '2D',
    transparent: pick(line, /Transparent\s*(Y|N|~)/),
    resolution:
      pick(line, /(vector|\d{3,4}²|\d{3,4}×\d{3,4}|\d{3,4}–\d{3,4}px|\d{3,4}px|per-item|per-platform)/) ??
      '',
    reuse: pick(line, /Reuse\s*(Global|Multi|Single)/) ?? 'Single',
    can3d: pick(line, /Can.?3D\s*(Y|~|N)/) ?? 'N',
  };
}

/** Parse the 26 category tables of MASTER_ASSET_INVENTORY.md into RegistryAsset records. */
export function ingestAssets(inventoryMd: string): { assets: RegistryAsset[]; skipped: string[] } {
  const assets: RegistryAsset[] = [];
  const skipped: string[] = [];

  for (const sec of splitSections(inventoryMd, 1)) {
    if (!/^\d+\s+·\s+/.test(sec.heading)) continue; // category sections only
    const table = parseTable(sec.body);
    if (!table || !table.headers.includes('ID')) continue;

    const catToken = pick(sec.body, /sap_([a-z0-9]+)_/) ?? 'misc';
    const def = categoryDefaults(sec.body);

    for (const row of table.rows) {
      const id = (row['ID'] ?? '').trim();
      if (!/^[A-Z][A-Z0-9]{0,4}-\d+$/.test(id)) continue;

      const ov = row['Overrides'] ?? '';
      const type = pick(ov, /(?<!Can.)\b(SVG|2D|3D|VID)\b/) ?? def.type;
      const priRaw = (row['Pri'] ?? '').trim();
      const priority = (['C', 'H', 'M', 'L'] as const).find((p) => p === priRaw) ?? 'M';

      const candidate = {
        id,
        name: (row['Asset Name'] ?? '').trim(),
        category: catToken,
        sections_raw: (row['Section(s)'] ?? '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        priority,
        static_animated: (row['S/A'] ?? 'S').trim() || 'S',
        modality: TYPE_TO_MODALITY[type] ?? 'image',
        transparent_bg: mapTransparent(pick(ov, /Bg\s*(Y|N|~)/) ?? def.transparent),
        resolution:
          pick(ov, /(\d{3,4}²|\d{3,4}×\d{3,4}|\d{3,4}px|4K|2K|2560|1200×630|1080²|1080×1920)/) ??
          def.resolution,
        reuse: (pick(ov, /Reuse\s*(Global|Multi|Single)/) ?? def.reuse) as
          | 'Global'
          | 'Multi'
          | 'Single',
        can_3d: (pick(ov, /Can.?3D\s*(Y|~|N)/) ?? def.can3d) as 'Y' | '~' | 'N',
        derives_from: pick(`${row['Description'] ?? ''} ${ov}`, /\(=\s*([A-Z][A-Z0-9]{0,4}-\d+)\)/),
        batch: null,
        family: null,
        scenes: [] as string[],
      };

      const parsed = RegistryAssetSchema.safeParse(candidate);
      if (parsed.success) assets.push(parsed.data);
      else skipped.push(`${id}: ${parsed.error.issues.map((i) => i.message).join('; ')}`);
    }
  }
  return { assets, skipped };
}
