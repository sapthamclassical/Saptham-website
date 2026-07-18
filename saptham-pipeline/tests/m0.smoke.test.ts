import { describe, it, expect } from 'vitest';
import {
  AssetSchema, PromptCardSchema, GenerationRequestSchema, ArtifactSchema, GenerationResultSchema,
} from '../pipeline/domain';
import { FakeProvider } from '../pipeline/providers/base';
import { loadCanonBundle } from '../pipeline/canon/loader';

describe('M0 · domain contracts round-trip', () => {
  it('validates an Asset (S1-06 Hero Veena shape)', () => {
    const a = AssetSchema.parse({
      id: 'INS-04', name: 'Hero Veena', category: 'instruments', batch: 'b07-lit-objects',
      family: 'B', modality: 'image', priority: 'C', scenes: ['01'],
      transparent_bg: true, resolution: '3840', aspect_ratio: '4:5', can_3d: 'Y',
      reuse: 'Multi', derives_from: null, naming: 'sap_ins_veena_hero',
    });
    expect(a.family).toBe('B');
  });

  it('validates a PromptCard and applies variant default', () => {
    const c = PromptCardSchema.parse({ asset_id: 'INS-04', subject: 'A Saraswati veena in lit aged brass.' });
    expect(c.variants).toBe(4);
  });

  it('validates a GenerationRequest', () => {
    const r = GenerationRequestSchema.parse({
      request_id: 'req-1', asset_id: 'INS-04', modality: 'image', family: 'B',
      composed_prompt: 'GSC ... veena', aspect_ratio: '4:5', resolution: '3840',
      num_variants: 4, prompt_hash: 'abc123',
    });
    expect(r.num_variants).toBe(4);
    expect(r.seed).toBeNull();
  });

  it('validates an Artifact sidecar with provenance', () => {
    const art = ArtifactSchema.parse({
      artifact_id: 'art-1', content_hash: 'deadbeef', asset_id: 'INS-04', version: 'v1',
      variant: 'var-01', path: 'vault/store/de/deadbeef.png', mime: 'image/png',
      status: 'candidate', created_at: '2026-07-15T00:00:00Z',
      provenance: { prompt_hash: 'abc123', provider: 'higgsfield', model: 'nano_banana_pro', request_id: 'req-1', run_id: 'run-1' },
    });
    expect(art.acceptance.passed).toBeNull();
  });
});

describe('M0 · FakeProvider satisfies the Provider contract', () => {
  it('returns exactly num_variants artifacts', async () => {
    const req = GenerationRequestSchema.parse({
      request_id: 'req-2', asset_id: 'LGT-01', modality: 'image', family: 'B',
      composed_prompt: 'GSC ... oil lamp', aspect_ratio: '4:5', resolution: '3840',
      num_variants: 4, prompt_hash: 'hash', seed: 100,
    });
    const result = await new FakeProvider().submit(req);
    expect(GenerationResultSchema.parse(result).state).toBe('succeeded');
    expect(result.artifacts).toHaveLength(4);
    expect(result.artifacts[0]?.seed_used).toBe(100);
  });
});

describe('M0 · canon bundle loads + validates', () => {
  const bundle = loadCanonBundle('vault/canon');

  it('loads the verbatim GSC and all 7 swara hues', () => {
    expect(bundle.canon.gsc).toContain('chiaroscuro');
    expect(Object.keys(bundle.canon.tokens.swara_hues)).toHaveLength(7);
    expect(bundle.canon.tokens.gold_gradient).toEqual(['#8A6A25', '#C9A24B', '#EBD08A']);
  });

  it('has the Higgsfield aggregator enabled and others staged', () => {
    const hf = bundle.providers.providers.find((p) => p.id === 'higgsfield');
    expect(hf?.enabled).toBe(true);
    expect(hf?.dynamic_catalog).toBe(true);
    expect(bundle.providers.providers.filter((p) => !p.enabled).length).toBeGreaterThan(0);
  });

  it('is free-first in policy', () => {
    expect(bundle.policy.free_first).toBe(true);
    expect(bundle.policy.tier_order[0]).toBe('local_oss'); // free-first: local tools rank first
  });
});
