import { describe, it, expect } from 'vitest';
import { buildAdapters, ollamaComfyPlan, GeminiAdapter } from '../pipeline/providers';
import { GenerationRequestSchema } from '../pipeline/domain';

const req = GenerationRequestSchema.parse({
  request_id: 'r', asset_id: 'LGT-01', modality: 'image', family: 'B',
  composed_prompt: 'x', aspect_ratio: '4:5', resolution: '3840', prompt_hash: 'h',
});

describe('M3 · adapters', () => {
  it('builds all 9 adapters with the right ids', () => {
    const a = buildAdapters();
    expect(Object.keys(a).sort()).toEqual(
      ['blender', 'comfyui', 'ffmpeg', 'gemini', 'higgsfield', 'kling', 'ollama', 'openart', 'pixverse'],
    );
  });

  it('MCP adapter throws without an invoker, works with one', async () => {
    const noInvoker = buildAdapters().openart!;
    await expect(noInvoker.submit(req)).rejects.toThrow(/invoker/);

    const withInvoker = buildAdapters({
      invokers: {
        openart: async (r) => ({
          request_id: r.request_id, provider: 'openart', model: 'nano-banana-pro',
          state: 'succeeded', job_handle: null, artifacts: [], revised_prompt: null,
          latency_ms: 1, cost: 0, raw_response_ref: null, error: null,
        }),
      },
    }).openart!;
    const out = await withInvoker.submit(req);
    expect(out.provider).toBe('openart');
  });

  it('HTTP adapter validate reflects env presence (no secret leakage)', () => {
    delete process.env.GEMINI_API_KEY;
    expect(new GeminiAdapter().validate(req).ok).toBe(false);
    process.env.GEMINI_API_KEY = 'test-key';
    const v = new GeminiAdapter().validate(req);
    expect(v.ok).toBe(true);
    expect(JSON.stringify(v)).not.toContain('test-key');
    delete process.env.GEMINI_API_KEY;
  });

  it('Ollama→ComfyUI plan wires local reasoning into local image workflows', () => {
    const plan = ollamaComfyPlan('a gold veena');
    expect(plan.step1.tool).toBe('ollama');
    expect(plan.step2.tool).toBe('comfyui');
    expect(plan.step1.responsibilities).toContain('negatives');
  });
});
