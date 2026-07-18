import { describe, it, expect } from 'vitest';
import { mkdtempSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { GenerationRequestSchema } from '../pipeline/domain';
import { FakeProvider } from '../pipeline/providers/base';
import { storeResult, alreadyStored, loadAssetVersion, approve, publish, assetJsonPath, type AssetMeta } from '../pipeline/storage';

const meta: AssetMeta = { asset_id: 'LGT-01', batch: 'b07-lit-metal-hero', category: 'lgt', version: 'v1', naming: 'sap_lgt_lgt01' };
const request = GenerationRequestSchema.parse({
  request_id: 'r1', asset_id: 'LGT-01', modality: 'image', family: 'B',
  composed_prompt: 'GSC ... lamp', aspect_ratio: '4:5', resolution: '3840', num_variants: 4, prompt_hash: 'ph', seed: 7,
});

function tmpVault() {
  return join(mkdtempSync(join(tmpdir(), 'saptham-')), 'vault');
}

describe('M4 · storage + versioning', () => {
  it('stores variants + sidecars + asset.json (candidate)', async () => {
    const vault = tmpVault();
    const result = await new FakeProvider().submit(request);
    const stored = await storeResult(vault, meta, request, result, 'run-x');

    expect(stored).toHaveLength(4);
    const dir = join(vault, 'assets', meta.batch, meta.category, meta.asset_id, meta.version);
    expect(existsSync(join(dir, 'var-01.png'))).toBe(true);
    expect(existsSync(join(dir, 'var-01.json'))).toBe(true);
    // content-addressed store populated
    expect(existsSync(join(vault, 'store', stored[0]!.content_hash.slice(0, 2)))).toBe(true);

    const av = loadAssetVersion(assetJsonPath(vault, meta.batch, meta.category, meta.asset_id), meta.asset_id);
    expect(av.versions[0]?.status).toBe('candidate');
    expect(av.versions[0]?.variants).toHaveLength(4);
  });

  it('is idempotent — alreadyStored true after a store', async () => {
    const vault = tmpVault();
    expect(alreadyStored(vault, meta)).toBe(false);
    await storeResult(vault, meta, request, await new FakeProvider().submit(request), 'run-y');
    expect(alreadyStored(vault, meta)).toBe(true);
  });

  it('approve → publish transitions and sets current pointer', async () => {
    const vault = tmpVault();
    await storeResult(vault, meta, request, await new FakeProvider().submit(request), 'run-z');
    const path = assetJsonPath(vault, meta.batch, meta.category, meta.asset_id);
    let av = loadAssetVersion(path, meta.asset_id);

    expect(() => publish(av, 'v1')).toThrow(/approved/); // cannot publish before approval
    av = approve(av, 'v1', 'var-02');
    expect(av.versions[0]?.status).toBe('approved');
    av = publish(av, 'v1');
    expect(av.versions[0]?.status).toBe('published');
    expect(av.current).toEqual({ version: 'v1', published_variant: 'var-02' });
  });
});
