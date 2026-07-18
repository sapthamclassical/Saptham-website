import type { Capability, GenerationRequest, GenerationResult, ArtifactRef } from '../../domain';
import type { Provider, JobHandle, ValidationResult } from '../base';
import { env } from '../../canon/env';

/** Local free tool base — gated by a path/host env var; execution deferred to M4. */
abstract class LocalAdapter implements Provider {
  protected constructor(
    protected readonly id_: string,
    protected readonly requiresEnv: string[],
    protected readonly caps: Capability[],
  ) {}

  get id(): string {
    return this.id_;
  }

  describeCapabilities(): Capability[] {
    return this.caps;
  }

  validate(_req: GenerationRequest): ValidationResult {
    const missing = this.requiresEnv.filter((n) => !env.has(n));
    return missing.length ? { ok: false, issues: [`missing env: ${missing.join(', ')}`] } : { ok: true, issues: [] };
  }

  estimateCost(_req: GenerationRequest): number {
    return 0; // local = free
  }

  async submit(_req: GenerationRequest): Promise<GenerationResult> {
    throw new Error(`${this.id}: local execution is wired in M4`);
  }

  async poll(_handle: JobHandle): Promise<GenerationResult> {
    throw new Error(`${this.id}: n/a`);
  }

  async fetch(ref: ArtifactRef): Promise<Uint8Array> {
    if (ref.bytesBase64) return Uint8Array.from(Buffer.from(ref.bytesBase64, 'base64'));
    throw new Error(`${this.id}: fetch wired in M4`);
  }
}

export class ComfyUIAdapter extends LocalAdapter {
  constructor() {
    super('comfyui', ['COMFYUI_HOST'], [
      { modality: 'image', mode: 'async', max_resolution: 4096, aspect_ratios: ['1:1', '16:9', '9:16', '4:5', '21:9'], supports_negative_prompt: true, reference_images: 4, supports_seed: true, formats: ['png'] },
    ]);
  }

  /** Build a ComfyUI `/prompt` POST for a workflow graph. Token from env, never logged. */
  buildWorkflowRequest(graph: unknown) {
    const token = env.get('COMFYUI_TOKEN');
    const host = env.get('COMFYUI_HOST') ?? 'http://127.0.0.1:8188';
    return {
      url: `${host}/prompt`,
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: { prompt: graph },
    };
  }
}

export class OllamaAdapter extends LocalAdapter {
  constructor() {
    super('ollama', ['OLLAMA_HOST'], []); // reasoning tool: no media Capability, routed by tags
  }

  /** Build an Ollama `/api/generate` request for prompt enhancement/decomposition (exec in M4). */
  buildReasoningRequest(prompt: string, model = 'llama3.1') {
    const host = env.get('OLLAMA_HOST') ?? 'http://127.0.0.1:11434';
    return { url: `${host}/api/generate`, headers: { 'Content-Type': 'application/json' }, body: { model, prompt, stream: false } };
  }
}

export class FFmpegAdapter extends LocalAdapter {
  constructor() {
    super('ffmpeg', ['FFMPEG_PATH'], [
      { modality: 'video', mode: 'sync', aspect_ratios: [], supports_negative_prompt: false, reference_images: 0, supports_seed: false, formats: ['mp4', 'webm'] },
    ]);
  }

  /** Build an ffmpeg argv (encode/concat/reframe/poster) — spawned in M4. */
  buildCommand(args: string[]): { bin: string; args: string[] } {
    return { bin: env.get('FFMPEG_PATH') ?? 'ffmpeg', args };
  }
}

export class BlenderAdapter extends LocalAdapter {
  constructor() {
    super('blender', ['BLENDER_PATH'], [
      { modality: '3d', mode: 'async', aspect_ratios: [], supports_negative_prompt: false, reference_images: 0, supports_seed: false, formats: ['glb', 'png'] },
    ]);
  }

  /** Build a headless Blender argv running a Python export script — spawned in M4. */
  buildHeadlessCommand(script: string, args: string[] = []): { bin: string; args: string[] } {
    return { bin: env.get('BLENDER_PATH') ?? 'blender', args: ['--background', '--python', script, ...args] };
  }
}

/**
 * Ollama → ComfyUI integration plan (the wiring you asked for). Ollama does the reasoning
 * (enhance / decompose / negatives / reference summary / consistency), ComfyUI executes the
 * image workflow. This returns the declarative two-step plan; execution lands in M4.
 */
export function ollamaComfyPlan(prompt: string) {
  return {
    step1: {
      tool: 'ollama',
      role: 'prompt_enhancement',
      env: 'OLLAMA_HOST',
      responsibilities: ['enhance', 'decompose', 'negatives', 'reference_summary', 'consistency_check', 'prompt_memory'],
      input: prompt,
    },
    step2: {
      tool: 'comfyui',
      role: 'text_to_image',
      env: ['COMFYUI_HOST', 'COMFYUI_TOKEN'],
      responsibilities: ['node_execution', 'image_generation', 'upscaling', 'inpainting'],
      input: '<enhanced prompt + negatives from step1>',
    },
    note: 'Local, free reasoning feeds local, free image workflows. Executed in M4 orchestration.',
  };
}
