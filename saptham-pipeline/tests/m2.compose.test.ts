import { describe, it, expect } from 'vitest';
import { loadCanonBundle } from '../pipeline/canon/loader';
import { loadRegistryAssets, loadRegistryScenes } from '../pipeline/registry';
import { loadCard, composeRequest, foldNegatives } from '../pipeline/prompt_engine';

const { canon } = loadCanonBundle('vault/canon');
const assets = loadRegistryAssets('vault/registry');
const scenes = loadRegistryScenes('vault/registry');

function asset(id: string) {
  const a = assets.find((x) => x.id === id);
  if (!a || !a.batch) throw new Error(`missing/unbatched: ${id}`);
  return a;
}

describe('M2 · deterministic composition (family B)', () => {
  const a = asset('LGT-01');
  const card = loadCard('LGT-01', a.batch!);

  it('prepends the verbatim GSC and includes the subject', () => {
    const r = composeRequest(card, a, canon);
    expect(r.composed_prompt.startsWith(canon.gsc)).toBe(true);
    expect(r.composed_prompt).toContain('kuthuvilakku');
  });

  it('negative = NEG-B preset ⊕ card delta (in order)', () => {
    const r = composeRequest(card, a, canon);
    expect(r.negative_prompt).toContain('flat yellow gold'); // from preset B
    expect(r.negative_prompt.endsWith('electric bulb, candle wax, plastic')).toBe(true); // delta last
  });

  it('is idempotent — same inputs, same prompt_hash', () => {
    const h1 = composeRequest(card, a, canon).prompt_hash;
    const h2 = composeRequest(card, a, canon).prompt_hash;
    expect(h1).toBe(h2);
    expect(h1).toMatch(/^[a-f0-9]{64}$/);
  });

  it('folds negatives for engines without a native negative field', () => {
    const r = composeRequest(card, a, canon);
    expect(foldNegatives(r).endsWith('plastic.')).toBe(true);
  });
});

describe('M2 · family-aware override (family A)', () => {
  it('KOL-01 uses the flat-lighting override, not the card lighting; NEG-A', () => {
    const a = asset('KOL-01');
    const r = composeRequest(loadCard('KOL-01', a.batch!), a, canon);
    expect(r.family).toBe('A');
    expect(r.composed_prompt).toContain('flat, no directional light'); // canon.families.A override
    expect(r.negative_prompt).toContain('uneven strokes'); // NEG-A
  });
});

describe('M2 · swara resolution', () => {
  it('MAN-03 resolves {{swara}} from the scene to the correct hue', () => {
    const a = asset('MAN-03');
    const padam = scenes.find((s) => s.id === '10'); // Padam → Da → #5E2E52
    const r = composeRequest(loadCard('MAN-03', a.batch!), a, canon, { sceneSwara: padam?.swara });
    expect(padam?.swara).toBe('Da');
    expect(r.composed_prompt).toContain('#5E2E52');
    expect(r.composed_prompt).not.toContain('{{swara}}');
  });
});
