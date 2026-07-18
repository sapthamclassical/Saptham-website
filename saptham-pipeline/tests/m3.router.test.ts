import { describe, it, expect } from 'vitest';
import { loadCanonBundle } from '../pipeline/canon/loader';
import type { EnvReader } from '../pipeline/canon/env';
import { AuthGate, routeCapability } from '../pipeline/providers';

const { providers, policy } = loadCanonBundle('vault/canon');
const routerPolicy = { tier_order: policy.tier_order, free_first: policy.free_first };

function fakeEnv(set: Record<string, string>): EnvReader {
  return { has: (n) => n in set, get: (n) => set[n] };
}

describe('M3 · capability router (free-first)', () => {
  it('text_to_image: prefers a ready local tool (ComfyUI) over paid MCP', () => {
    // ComfyUI ready (host set), OpenArt ready (credits) — free-first ranks local first.
    const gate = new AuthGate({
      env: fakeEnv({ COMFYUI_HOST: 'http://x', COMFYUI_TOKEN: 't' }),
      credits: { openart: 40 },
    });
    const r = routeCapability(providers.providers, { capability: 'text_to_image' }, gate, routerPolicy);
    expect(r.unmet).toBe(false);
    expect(r.chosen?.provider).toBe('comfyui'); // local_oss beats free_mcp
  });

  it('image_to_video: local tools cannot; picks the ready MCP (OpenArt, not 0-credit Kling)', () => {
    const gate = new AuthGate({ env: fakeEnv({}), credits: { openart: 40, kling: 0, higgsfield: 0 } });
    const r = routeCapability(providers.providers, { capability: 'image_to_video' }, gate, routerPolicy);
    expect(r.chosen?.provider).toBe('openart');
    // Kling appears in the chain but not chosen (needs_credits)
    const kling = r.candidates.find((c) => c.provider === 'kling');
    expect(kling?.auth.ok).toBe(false);
  });

  it('svg_generation: no provider advertises it → unmet', () => {
    const gate = new AuthGate({ env: fakeEnv({}) });
    const r = routeCapability(providers.providers, { capability: 'svg_generation' }, gate, routerPolicy);
    expect(r.unmet).toBe(true);
    expect(r.chosen).toBeNull();
  });

  it('returns a full ranked fallback chain, ready candidates first', () => {
    const gate = new AuthGate({ env: fakeEnv({ GEMINI_API_KEY: 'g' }), credits: { openart: 40, kling: 0, higgsfield: 0 } });
    const r = routeCapability(providers.providers, { capability: 'text_to_image' }, gate, routerPolicy);
    const readyFlags = r.candidates.map((c) => c.auth.ok);
    // once a false appears, no true follows (ready-first ordering)
    const firstFalse = readyFlags.indexOf(false);
    if (firstFalse >= 0) expect(readyFlags.slice(firstFalse).every((x) => x === false)).toBe(true);
  });
});
