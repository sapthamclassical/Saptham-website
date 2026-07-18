import { describe, it, expect, vi, afterEach } from 'vitest';
import { buildTxt2ImgGraph, dimsForAspect } from '../pipeline/providers/adapters/comfy-workflow';
import { OllamaClient, ComfyClient } from '../pipeline/providers';

afterEach(() => vi.unstubAllGlobals());

describe('ComfyUI · txt2img workflow graph', () => {
  const g = buildTxt2ImgGraph({ prompt: 'a gold veena', negative: 'neon', width: 1344, height: 768, seed: 42, ckpt: 'x.safetensors' }) as Record<string, { class_type: string; inputs: Record<string, unknown> }>;

  it('has the canonical SDXL node chain', () => {
    expect(g['4']?.class_type).toBe('CheckpointLoaderSimple');
    expect(g['3']?.class_type).toBe('KSampler');
    expect(g['9']?.class_type).toBe('SaveImage');
  });
  it('wires positive/negative/latent into the sampler and decodes to save', () => {
    expect(g['3']?.inputs.positive).toEqual(['6', 0]);
    expect(g['3']?.inputs.negative).toEqual(['7', 0]);
    expect(g['3']?.inputs.latent_image).toEqual(['5', 0]);
    expect(g['3']?.inputs.seed).toBe(42);
    expect(g['8']?.inputs.samples).toEqual(['3', 0]);
    expect(g['9']?.inputs.images).toEqual(['8', 0]);
    expect(g['6']?.inputs.text).toBe('a gold veena');
    expect(g['7']?.inputs.text).toBe('neon');
  });
  it('maps aspect ratios to ~1MP SDXL dimensions', () => {
    expect(dimsForAspect('16:9')).toEqual({ width: 1344, height: 768 });
    expect(dimsForAspect('4:5')).toEqual({ width: 896, height: 1152 });
    expect(dimsForAspect('weird')).toEqual({ width: 1024, height: 1024 });
  });
});

describe('Ollama client', () => {
  it('builds a brand-aware enhance body (system + prompt, non-streaming)', () => {
    const body = new OllamaClient('http://x').buildEnhanceBody('a lamp', 'llama3.2');
    expect(body.model).toBe('llama3.2');
    expect(body.stream).toBe(false);
    expect(body.system).toMatch(/Saptham/);
    expect(body.prompt).toBe('a lamp');
  });

  it('enhance() returns the model response (mocked fetch)', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ response: '  an aged brass lamp, chiaroscuro  ' }), { status: 200 })));
    const out = await new OllamaClient('http://x').enhance('a lamp');
    expect(out).toBe('an aged brass lamp, chiaroscuro');
  });
});

describe('ComfyUI client', () => {
  it('health() reports DOWN on connection failure', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('ECONNREFUSED'); }));
    const h = await new ComfyClient('http://127.0.0.1:8188').health();
    expect(h.up).toBe(false);
  });

  it('submit() returns the prompt_id (mocked)', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ prompt_id: 'p123' }), { status: 200 })));
    const id = await new ComfyClient('http://x').submit(buildTxt2ImgGraph({ prompt: 'p', negative: 'n', width: 1024, height: 1024, seed: 1 }));
    expect(id).toBe('p123');
  });

  it('pollImages() extracts non-temp output images (mocked)', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({
      p123: { outputs: { '9': { images: [{ filename: 'saptham_0001.png', subfolder: '', type: 'output' }] } } },
    }), { status: 200 })));
    const imgs = await new ComfyClient('http://x').pollImages('p123', { sleep: async () => {} });
    expect(imgs[0]?.filename).toBe('saptham_0001.png');
  });
});
