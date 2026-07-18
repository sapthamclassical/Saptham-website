import type { RegistryAsset } from '../registry/schemas';
import type { AssetMeta } from '../storage';

/** Derive the storage AssetMeta for a registry asset (single-asset planning for M4). */
export function metaFromAsset(asset: RegistryAsset, version = 'v1'): AssetMeta {
  return {
    asset_id: asset.id,
    batch: asset.batch ?? 'unbatched',
    category: asset.category,
    version,
    naming: `sap_${asset.category}_${asset.id.toLowerCase().replace(/-/g, '')}`,
  };
}
