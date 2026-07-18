import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import type { ArtifactRef } from '../domain';

export function hashBytes(bytes: Uint8Array): string {
  return createHash('sha256').update(bytes).digest('hex');
}

/** Write bytes to a content-addressed path, never overwriting (immutable store). */
export function putBytes(path: string, bytes: Uint8Array): void {
  mkdirSync(dirname(path), { recursive: true });
  if (!existsSync(path)) writeFileSync(path, bytes);
}

export function writeFileBytes(path: string, bytes: Uint8Array): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, bytes);
}

export function writeJson(path: string, obj: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

export function readJson<T>(path: string): T | null {
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

/** Materialize a provider ArtifactRef into raw bytes (base64 inline, or download a uri). */
export async function materialize(ref: ArtifactRef): Promise<{ bytes: Uint8Array; mime: string }> {
  if (ref.bytesBase64) {
    return { bytes: Uint8Array.from(Buffer.from(ref.bytesBase64, 'base64')), mime: ref.mime };
  }
  if (ref.uri) {
    const res = await fetch(ref.uri);
    if (!res.ok) throw new Error(`download failed ${res.status} for ${ref.uri}`);
    const buf = new Uint8Array(await res.arrayBuffer());
    return { bytes: buf, mime: ref.mime || res.headers.get('content-type') || 'application/octet-stream' };
  }
  throw new Error('artifact ref has neither bytesBase64 nor uri');
}
