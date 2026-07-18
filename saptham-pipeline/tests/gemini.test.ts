import { describe, it, expect, vi, afterEach } from 'vitest';
import { GeminiClient } from '../pipeline/providers';

afterEach(() => vi.unstubAllGlobals());

const okJson = (obj: unknown, status = 200) => new Response(JSON.stringify(obj), { status });

describe('Gemini client', () => {
  it('health() is false without a key', async () => {
    const h = await new GeminiClient(undefined).health();
    expect(h.up).toBe(false);
  });

  it('generateImage() decodes the inlineData part', async () => {
    const b64 = Buffer.from('PNGBYTES').toString('base64');
    vi.stubGlobal('fetch', vi.fn(async () => okJson({ candidates: [{ content: { parts: [{ inlineData: { data: b64, mimeType: 'image/png' } }] } }] })));
    const img = await new GeminiClient('k').generateImage('a gold lamp', { aspectRatio: '16:9' });
    expect(img.mime).toBe('image/png');
    expect(Buffer.from(img.bytes).toString()).toBe('PNGBYTES');
  });

  it('reason() concatenates text parts', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => okJson({ candidates: [{ content: { parts: [{ text: 'en' }, { text: 'hanced' }] } }] })));
    expect(await new GeminiClient('k').reason('optimize this')).toBe('enhanced');
  });

  it('surfaces 429 quota exhaustion as a clear error', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => okJson({ error: { status: 'RESOURCE_EXHAUSTED' } }, 429)));
    await expect(new GeminiClient('k').generateImage('x')).rejects.toThrow(/RESOURCE_EXHAUSTED/);
  });

  it('never puts the key in the request URL (uses header auth)', async () => {
    const spy = vi.fn(async () => okJson({ candidates: [] }));
    vi.stubGlobal('fetch', spy);
    await new GeminiClient('secret-key').reason('x').catch(() => {});
    const url = String((spy.mock.calls[0] as unknown[] | undefined)?.[0] ?? '');
    expect(url).not.toContain('secret-key');
  });
});
