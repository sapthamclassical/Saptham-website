import { ArtifactSchema, type Artifact, type GenerationRequest, type GenerationResult } from '../domain';
import { hashBytes, putBytes, writeFileBytes, writeJson, materialize } from './content-store';
import { loadAssetVersion, saveAssetVersion, upsertCandidate } from './version-graph';
import { assetJsonPath, extFromMime, storePath, variantName, workingDir } from './paths';
import { join } from 'node:path';

export interface AssetMeta {
  asset_id: string;
  batch: string;
  category: string;
  version: string;
  naming: string;
}

export interface StoredArtifact {
  variant: string;
  content_hash: string;
  path: string;
  mime: string;
  status: string;
}

/**
 * L6 Output Manager — persist a provider result into the vault: content-addressed store,
 * human-navigable working variants, a JSON sidecar per variant (full provenance), and the
 * updated version graph. Immutable bytes; re-running the same content is a no-op (dedup).
 */
export async function storeResult(
  vault: string,
  meta: AssetMeta,
  request: GenerationRequest,
  result: GenerationResult,
  runId: string,
): Promise<StoredArtifact[]> {
  const dir = workingDir(vault, meta.batch, meta.category, meta.asset_id, meta.version);
  const stored: StoredArtifact[] = [];
  const referenceIds = request.reference_images.map((r) => r.id);

  for (const ref of result.artifacts) {
    const { bytes, mime } = await materialize(ref);
    const ext = extFromMime(mime);
    const content_hash = hashBytes(bytes);
    const variant = variantName(ref.variant_index);

    putBytes(storePath(vault, content_hash, ext), bytes); // immutable dedup store
    writeFileBytes(join(dir, `${variant}.${ext}`), bytes); // navigable working copy

    const artifact: Artifact = ArtifactSchema.parse({
      artifact_id: `${meta.asset_id}:${meta.version}:${variant}`,
      content_hash,
      asset_id: meta.asset_id,
      version: meta.version,
      variant,
      path: storePath(vault, content_hash, ext),
      mime,
      width: ref.width,
      height: ref.height,
      duration: ref.duration,
      status: 'candidate',
      provenance: {
        prompt_hash: request.prompt_hash,
        provider: result.provider,
        model: result.model,
        seed: ref.seed_used,
        reference_ids: referenceIds,
        request_id: request.request_id,
        run_id: runId,
      },
      acceptance: {},
      created_at: new Date().toISOString(),
    });
    writeJson(join(dir, `${variant}.json`), artifact);
    stored.push({ variant, content_hash, path: artifact.path, mime, status: 'candidate' });
  }

  const avPath = assetJsonPath(vault, meta.batch, meta.category, meta.asset_id);
  const av = upsertCandidate(
    loadAssetVersion(avPath, meta.asset_id),
    meta.version,
    stored.map((s) => s.variant),
    request.prompt_hash,
    runId,
  );
  saveAssetVersion(avPath, av);

  return stored;
}

/** Idempotency: does this asset/version already have stored variants? */
export function alreadyStored(vault: string, meta: AssetMeta): boolean {
  const av = loadAssetVersion(assetJsonPath(vault, meta.batch, meta.category, meta.asset_id), meta.asset_id);
  const v = av.versions.find((x) => x.version === meta.version);
  return !!v && v.variants.length > 0;
}
