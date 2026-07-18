import { describe, it, expect } from 'vitest';
import { mkdtempSync, existsSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { GenerationRequestSchema } from '../pipeline/domain';
import { FakeProvider } from '../pipeline/providers/base';
import { storeResult, loadAssetVersion, assetJsonPath, type AssetMeta } from '../pipeline/storage';
import { approveAsset, publishAsset, acceptanceOf, STYLE_ANCHOR_ID } from '../pipeline/review';

const anchorMeta: AssetMeta = { asset_id: STYLE_ANCHOR_ID, batch: 'b00-style-anchor-board', category: 'style', version: 'v1', naming: 'sap_style_style00' };
const lgtMeta: AssetMeta = { asset_id: 'LGT-01', batch: 'b07-lit-metal-hero', category: 'lgt', version: 'v1', naming: 'sap_lgt_lgt01' };

function req(assetId: string) {
  return GenerationRequestSchema.parse({
    request_id: 'r', asset_id: assetId, modality: 'image', family: 'B',
    composed_prompt: 'x', aspect_ratio: '16:9', resolution: '3840', prompt_hash: 'ph', num_variants: 1,
  });
}
async function seed(vault: string, meta: AssetMeta) {
  await storeResult(vault, meta, req(meta.asset_id), await new FakeProvider().submit(req(meta.asset_id)), 'run-1');
}
function vault() {
  return join(mkdtempSync(join(tmpdir(), 'saptham-m8-')), 'vault');
}

describe('M8 · acceptance gate + publish', () => {
  it('a Critical asset cannot be published before approval', async () => {
    const v = vault();
    await seed(v, anchorMeta);
    expect(() => publishAsset(v, anchorMeta, { priority: 'C', anchorMeta: null })).toThrow(/approved/);
  });

  it('approve records the acceptance test on the sidecar', async () => {
    const v = vault();
    await seed(v, anchorMeta);
    approveAsset(v, anchorMeta, 'var-01', { passed: true, notes: 'light+restraint+recital', reviewer: 'director' });
    const acc = acceptanceOf(v, anchorMeta, 'var-01');
    expect(acc.passed).toBe(true);
    expect(acc.reviewer).toBe('director');
    expect(loadAssetVersion(assetJsonPath(v, anchorMeta.batch, anchorMeta.category, anchorMeta.asset_id), STYLE_ANCHOR_ID).versions[0]?.status).toBe('approved');
  });

  it('drift guard: a non-anchor asset cannot publish before the style anchor', async () => {
    const v = vault();
    await seed(v, lgtMeta);
    approveAsset(v, lgtMeta, 'var-01', { passed: true, notes: 'ok', reviewer: 'director' });
    expect(() => publishAsset(v, lgtMeta, { priority: 'C', anchorMeta })).toThrow(/style anchor/);
  });

  it('anchor → then sibling: full publish to delivery under CANON naming', async () => {
    const v = vault();
    // publish the anchor first
    await seed(v, anchorMeta);
    approveAsset(v, anchorMeta, 'var-01', { passed: true, notes: 'anchor', reviewer: 'director' });
    const a = publishAsset(v, anchorMeta, { priority: 'C', anchorMeta });
    expect(existsSync(a.deliveryFile)).toBe(true);
    expect(a.deliveryFile).toMatch(/delivery[\\/]style[\\/]sap_style_style00_var-01_published@/);

    // now the sibling can publish
    await seed(v, lgtMeta);
    approveAsset(v, lgtMeta, 'var-01', { passed: true, notes: 'lamp', reviewer: 'director' });
    const l = publishAsset(v, lgtMeta, { priority: 'C', anchorMeta });
    expect(existsSync(l.deliveryFile)).toBe(true);

    const av = loadAssetVersion(assetJsonPath(v, lgtMeta.batch, lgtMeta.category, lgtMeta.asset_id), 'LGT-01');
    expect(av.current).toEqual({ version: 'v1', published_variant: 'var-01' });
    expect(readdirSync(join(v, 'delivery', 'lgt')).length).toBe(1);
  });
});
