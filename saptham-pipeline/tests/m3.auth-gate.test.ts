import { describe, it, expect } from 'vitest';
import { loadCanonBundle } from '../pipeline/canon/loader';
import type { EnvReader } from '../pipeline/canon/env';
import { AuthGate } from '../pipeline/providers';

const { providers } = loadCanonBundle('vault/canon');
const byId = (id: string) => {
  const p = providers.providers.find((x) => x.id === id);
  if (!p) throw new Error(id);
  return p;
};

/** In-memory env so tests never touch real secrets. */
function fakeEnv(set: Record<string, string>): EnvReader {
  return { has: (n) => n in set, get: (n) => set[n] };
}

describe('M3 · AuthGate', () => {
  it('OpenArt (mcp, connected, 40 credits) → ready', () => {
    const gate = new AuthGate({ env: fakeEnv({}), credits: { openart: 40 } });
    const s = gate.check(byId('openart'));
    expect(s.ok).toBe(true);
    expect(s.state).toBe('ready');
  });

  it('Kling (mcp, connected, 0 credits) → needs_credits', () => {
    const gate = new AuthGate({ env: fakeEnv({}), credits: { kling: 0 } });
    const s = gate.check(byId('kling'));
    expect(s.ok).toBe(false);
    expect(s.state).toBe('needs_credits');
  });

  it('PixVerse (api_key) → ready with key, needs_auth without', () => {
    expect(new AuthGate({ env: fakeEnv({ PIXVERSE_API_KEY: 'x' }) }).check(byId('pixverse')).state).toBe('ready');
    expect(new AuthGate({ env: fakeEnv({}) }).check(byId('pixverse')).state).toBe('needs_auth');
  });

  it('FFmpeg (local, requires_env) → ready with FFMPEG_PATH, needs_auth without', () => {
    expect(new AuthGate({ env: fakeEnv({ FFMPEG_PATH: 'ffmpeg' }) }).check(byId('ffmpeg')).state).toBe('ready');
    expect(new AuthGate({ env: fakeEnv({}) }).check(byId('ffmpeg')).state).toBe('needs_auth');
  });

  it('disabled provider (lumeflow) → unavailable', () => {
    expect(new AuthGate({ env: fakeEnv({}) }).check(byId('lumeflow')).state).toBe('unavailable');
  });

  it('never leaks a secret value into the status detail', () => {
    const s = new AuthGate({ env: fakeEnv({ PIXVERSE_API_KEY: 'super-secret-xyz' }) }).check(byId('pixverse'));
    expect(s.detail).not.toContain('super-secret-xyz');
  });
});
