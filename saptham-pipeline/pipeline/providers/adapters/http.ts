import type { Capability, GenerationRequest, GenerationResult, ArtifactRef } from '../../domain';
import type { Provider, JobHandle, ValidationResult } from '../base';
import { env } from '../../canon/env';

interface HttpCfg {
  id: string;
  endpoint: string;
  authEnv: string;
  headerName: string;
  scheme: 'bearer' | 'raw';
  capabilities: Capability[];
}

/** HTTP-API provider base. Builds auth headers from env (values never logged). Live
 *  request execution is deliberately deferred to M4 orchestration — M3 only wires config. */
abstract class HttpAdapter implements Provider {
  protected constructor(protected readonly cfg: HttpCfg) {}

  get id(): string {
    return this.cfg.id;
  }

  describeCapabilities(): Capability[] {
    return this.cfg.capabilities;
  }

  validate(_req: GenerationRequest): ValidationResult {
    return env.has(this.cfg.authEnv)
      ? { ok: true, issues: [] }
      : { ok: false, issues: [`${this.cfg.authEnv} not set`] };
  }

  estimateCost(_req: GenerationRequest): number {
    return 0;
  }

  /** Auth header built from env at call time; the secret never enters logs or return values. */
  protected authHeaders(): Record<string, string> {
    const key = env.get(this.cfg.authEnv);
    if (!key) return {};
    return { [this.cfg.headerName]: this.cfg.scheme === 'bearer' ? `Bearer ${key}` : key };
  }

  async submit(_req: GenerationRequest): Promise<GenerationResult> {
    throw new Error(`${this.id}: live HTTP submit is wired in M4 (M3 builds config + auth only)`);
  }

  async poll(_handle: JobHandle): Promise<GenerationResult> {
    throw new Error(`${this.id}: poll wired in M4`);
  }

  async fetch(ref: ArtifactRef): Promise<Uint8Array> {
    if (ref.bytesBase64) return Uint8Array.from(Buffer.from(ref.bytesBase64, 'base64'));
    throw new Error(`${this.id}: fetch-by-uri wired in M4`);
  }
}

export class PixverseAdapter extends HttpAdapter {
  constructor() {
    super({
      id: 'pixverse',
      endpoint: 'https://app-api.pixverse.ai',
      authEnv: 'PIXVERSE_API_KEY',
      headerName: 'API-KEY',
      scheme: 'raw',
      capabilities: [
        { modality: 'video', mode: 'async', max_resolution: 1080, aspect_ratios: ['16:9', '9:16', '1:1'], supports_negative_prompt: false, reference_images: 1, supports_seed: true, formats: ['mp4'] },
      ],
    });
  }
}

export class GeminiAdapter extends HttpAdapter {
  constructor() {
    super({
      id: 'gemini',
      endpoint: 'https://generativelanguage.googleapis.com',
      authEnv: 'GEMINI_API_KEY',
      headerName: 'x-goog-api-key',
      scheme: 'raw',
      capabilities: [
        { modality: 'image', mode: 'sync', max_resolution: 4096, aspect_ratios: ['1:1', '16:9', '9:16'], supports_negative_prompt: false, reference_images: 14, supports_seed: false, formats: ['png'] },
      ],
    });
  }

  /** Reasoning / prompt-optimization / OCR request builder (execution in M4). */
  buildReasoningRequest(prompt: string, model = 'gemini-2.5-flash') {
    return {
      url: `${this.cfg.endpoint}/v1beta/models/${model}:generateContent`,
      headers: { 'Content-Type': 'application/json', ...this.authHeaders() },
      body: { contents: [{ parts: [{ text: prompt }] }] },
    };
  }
}
