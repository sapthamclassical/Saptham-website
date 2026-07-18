import { AssetVersionSchema, type AssetVersion, type Status } from '../domain';
import { readJson, writeJson } from './content-store';

/** Load or initialise the version graph (`asset.json`) for an asset. */
export function loadAssetVersion(path: string, assetId: string): AssetVersion {
  const raw = readJson<unknown>(path);
  if (!raw) return AssetVersionSchema.parse({ asset_id: assetId, current: null, versions: [] });
  return AssetVersionSchema.parse(raw);
}

export function saveAssetVersion(path: string, av: AssetVersion): void {
  writeJson(path, AssetVersionSchema.parse(av));
}

/** Record (or refresh) a candidate version with its variants. Immutable bytes; only status/pointers move. */
export function upsertCandidate(
  av: AssetVersion,
  version: string,
  variants: string[],
  promptHash: string,
  runId: string,
): AssetVersion {
  const existing = av.versions.find((v) => v.version === version);
  if (existing) {
    existing.status = existing.status === 'published' ? 'published' : 'candidate';
    existing.variants = [...new Set([...existing.variants, ...variants])];
    existing.prompt_hash = promptHash;
    existing.run_id = runId;
  } else {
    av.versions.push({
      version, status: 'candidate', parent: null, variants,
      approved: null, prompt_hash: promptHash, run_id: runId,
    });
  }
  return av;
}

function setStatus(av: AssetVersion, version: string, status: Status): void {
  const v = av.versions.find((x) => x.version === version);
  if (!v) throw new Error(`version ${version} not found`);
  v.status = status;
}

export function approve(av: AssetVersion, version: string, variant: string): AssetVersion {
  const v = av.versions.find((x) => x.version === version);
  if (!v) throw new Error(`version ${version} not found`);
  if (!v.variants.includes(variant)) throw new Error(`variant ${variant} not in ${version}`);
  v.status = 'approved';
  v.approved = variant;
  return av;
}

export function publish(av: AssetVersion, version: string): AssetVersion {
  const v = av.versions.find((x) => x.version === version);
  if (!v) throw new Error(`version ${version} not found`);
  if (v.status !== 'approved' || !v.approved) throw new Error(`version ${version} must be approved before publish`);
  // supersede any previously published version
  for (const other of av.versions) if (other.version !== version && other.status === 'published') other.status = 'deprecated';
  v.status = 'published';
  av.current = { version, published_variant: v.approved };
  return av;
}

export function reject(av: AssetVersion, version: string): AssetVersion {
  setStatus(av, version, 'deprecated');
  return av;
}
