import { join } from 'node:path';

/** Deterministic vault paths (FOLDER_STRUCTURE.md §4). */
export const MIME_EXT: Record<string, string> = {
  'image/png': 'png',
  'image/webp': 'webp',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
};

export function extFromMime(mime: string): string {
  return MIME_EXT[mime] ?? 'bin';
}

export function workingDir(vault: string, batch: string, category: string, assetId: string, version: string): string {
  return join(vault, 'assets', batch, category, assetId, version);
}

export function assetJsonPath(vault: string, batch: string, category: string, assetId: string): string {
  return join(vault, 'assets', batch, category, assetId, 'asset.json');
}

export function storePath(vault: string, hash: string, ext: string): string {
  return join(vault, 'store', hash.slice(0, 2), `${hash}.${ext}`);
}

export function deliveryPath(vault: string, category: string, filename: string): string {
  return join(vault, 'delivery', category, filename);
}

export function variantName(index: number): string {
  return `var-${String(index + 1).padStart(2, '0')}`;
}
