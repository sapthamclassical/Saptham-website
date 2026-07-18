import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { z } from 'zod';
import { RegistryAssetSchema, RegistryBatchSchema, RegistrySceneSchema, type RegistryAsset } from './schemas';

/**
 * Load the ingested registry, merged with a hand-authored `assets.manual.yaml` overlay.
 * The ingester owns `assets.yaml` (regenerated from docs); humans own the overlay for
 * canon assets the inventory omitted (STYLE-00, and later WRK/CMP/SPN/JOIN…). Manual wins by id.
 */
export function loadRegistryAssets(dir = 'vault/registry'): RegistryAsset[] {
  const base = z.object({ assets: z.array(RegistryAssetSchema) })
    .parse(parse(readFileSync(join(dir, 'assets.yaml'), 'utf8'))).assets;
  const byId = new Map(base.map((a) => [a.id, a]));

  const manualPath = join(dir, 'assets.manual.yaml');
  if (existsSync(manualPath)) {
    const manual = z.object({ assets: z.array(RegistryAssetSchema) })
      .parse(parse(readFileSync(manualPath, 'utf8'))).assets;
    for (const a of manual) byId.set(a.id, a);
  }
  return [...byId.values()];
}

export function loadRegistryScenes(dir = 'vault/registry') {
  const data = parse(readFileSync(join(dir, 'scenes.yaml'), 'utf8'));
  return z.object({ scenes: z.array(RegistrySceneSchema) }).parse(data).scenes;
}

export function loadRegistryBatches(dir = 'vault/registry') {
  const data = parse(readFileSync(join(dir, 'batches.yaml'), 'utf8'));
  return z.object({ batches: z.array(RegistryBatchSchema) }).parse(data).batches;
}
