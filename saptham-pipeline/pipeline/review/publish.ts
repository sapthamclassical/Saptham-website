import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ArtifactSchema, type Artifact, type Status } from '../domain';
import { readJson, writeJson, writeFileBytes } from '../storage/content-store';
import { loadAssetVersion, saveAssetVersion, approve, publish, reject } from '../storage/version-graph';
import { assetJsonPath, deliveryPath, extFromMime, workingDir } from '../storage/paths';
import type { AssetMeta } from '../storage';

export const STYLE_ANCHOR_ID = 'STYLE-00';

export interface AcceptanceInput {
  passed: boolean;
  notes: string;
  reviewer: string;
}

function variantSidecarPath(vault: string, meta: AssetMeta, variant: string): string {
  return join(workingDir(vault, meta.batch, meta.category, meta.asset_id, meta.version), `${variant}.json`);
}

function loadArtifact(path: string): Artifact {
  const raw = readJson<unknown>(path);
  if (!raw) throw new Error(`artifact sidecar not found: ${path}`);
  return ArtifactSchema.parse(raw);
}

/** Record the 5-point acceptance test on the variant sidecar. */
export function recordAcceptance(vault: string, meta: AssetMeta, variant: string, input: AcceptanceInput): void {
  const path = variantSidecarPath(vault, meta, variant);
  const art = loadArtifact(path);
  art.acceptance = { passed: input.passed, notes: input.notes, reviewer: input.reviewer, ts: new Date().toISOString() };
  writeJson(path, ArtifactSchema.parse(art));
}

export function acceptanceOf(vault: string, meta: AssetMeta, variant: string): Artifact['acceptance'] {
  return loadArtifact(variantSidecarPath(vault, meta, variant)).acceptance;
}

/** Keep the variant sidecar's status in sync with the version-graph lifecycle. */
function setVariantStatus(vault: string, meta: AssetMeta, variant: string, status: Status): void {
  const path = variantSidecarPath(vault, meta, variant);
  const art = loadArtifact(path);
  art.status = status;
  writeJson(path, ArtifactSchema.parse(art));
}

/** Approve a variant: record acceptance + promote the version to `approved`. */
export function approveAsset(vault: string, meta: AssetMeta, variant: string, acceptance: AcceptanceInput): void {
  recordAcceptance(vault, meta, variant, acceptance);
  const avPath = assetJsonPath(vault, meta.batch, meta.category, meta.asset_id);
  const av = approve(loadAssetVersion(avPath, meta.asset_id), meta.version, variant);
  saveAssetVersion(avPath, av);
  setVariantStatus(vault, meta, variant, 'approved');
}

export function rejectAsset(vault: string, meta: AssetMeta): void {
  const avPath = assetJsonPath(vault, meta.batch, meta.category, meta.asset_id);
  saveAssetVersion(avPath, reject(loadAssetVersion(avPath, meta.asset_id), meta.version));
}

/** Is the style anchor (STYLE-00) published? Drift guard for all non-anchor publishes. */
export function anchorPublished(vault: string, anchorMeta: AssetMeta | null): boolean {
  if (!anchorMeta) return false;
  const av = loadAssetVersion(assetJsonPath(vault, anchorMeta.batch, anchorMeta.category, anchorMeta.asset_id), anchorMeta.asset_id);
  return !!av.current?.published_variant;
}

export interface PublishOpts {
  priority: string; // C/H require recorded acceptance
  anchorMeta: AssetMeta | null; // STYLE-00 meta for the drift guard (null if unknown)
}

export interface PublishResult {
  deliveryFile: string;
  variant: string;
}

/**
 * Publish the approved variant → `vault/delivery/` under the CANON naming convention.
 * Gates: (1) C/H assets require a passed acceptance; (2) non-anchor assets require the
 * style anchor to be published first (drift guard).
 */
export function publishAsset(vault: string, meta: AssetMeta, opts: PublishOpts): PublishResult {
  const avPath = assetJsonPath(vault, meta.batch, meta.category, meta.asset_id);
  const av = loadAssetVersion(avPath, meta.asset_id);
  const v = av.versions.find((x) => x.version === meta.version);
  if (!v || v.status !== 'approved' || !v.approved) {
    throw new Error(`${meta.asset_id} ${meta.version} must be approved before publish`);
  }
  const variant = v.approved;

  if (opts.priority === 'C' || opts.priority === 'H') {
    const acc = acceptanceOf(vault, meta, variant);
    if (acc.passed !== true) throw new Error(`${meta.asset_id} is ${opts.priority}: a passed acceptance test is required before publish`);
  }

  const isAnchor = meta.asset_id === STYLE_ANCHOR_ID;
  if (!isAnchor && !anchorPublished(vault, opts.anchorMeta)) {
    throw new Error(`drift guard: style anchor ${STYLE_ANCHOR_ID} must be published before ${meta.asset_id}`);
  }

  // copy approved bytes → delivery under CANON naming
  const art = loadArtifact(variantSidecarPath(vault, meta, variant));
  const ext = extFromMime(art.mime);
  const res = art.width ? `${art.width}w` : 'master';
  const filename = `${meta.naming}_${variant}_published@${res}.${ext}`;
  const dest = deliveryPath(vault, meta.category, filename);
  writeFileBytes(dest, readFileSync(art.path));

  saveAssetVersion(avPath, publish(av, meta.version));
  setVariantStatus(vault, meta, variant, 'published');
  return { deliveryFile: dest, variant };
}
