import { env } from '../canon/env';

export interface GeminiImage {
  bytes: Uint8Array;
  mime: string;
}

interface GenContentResponse {
  candidates?: { content?: { parts?: { text?: string; inlineData?: { data: string; mimeType?: string } }[] } }[];
  error?: { status?: string; message?: string };
}

/**
 * Google Gemini HTTP client. Auth via `x-goog-api-key` header (key never placed in the URL
 * or logs). Provides image generation (Nano Banana / `gemini-*-image`) and text reasoning
 * (prompt optimization / asset review / OCR). Quota exhaustion (429) surfaces as a clear error.
 */
export class GeminiClient {
  constructor(
    private readonly key: string | undefined = env.get('GEMINI_API_KEY'),
    private readonly base = 'https://generativelanguage.googleapis.com/v1beta',
  ) {}

  private headers(): Record<string, string> {
    return { 'Content-Type': 'application/json', ...(this.key ? { 'x-goog-api-key': this.key } : {}) };
  }

  async health(): Promise<{ up: boolean; detail: string }> {
    if (!this.key) return { up: false, detail: 'GEMINI_API_KEY not set' };
    try {
      const r = await fetch(`${this.base}/models`, { headers: this.headers() });
      return { up: r.ok, detail: r.ok ? 'authenticated' : `HTTP ${r.status}` };
    } catch (e) {
      return { up: false, detail: (e as Error).message };
    }
  }

  private async call(model: string, body: unknown): Promise<GenContentResponse> {
    const r = await fetch(`${this.base}/models/${model}:generateContent`, {
      method: 'POST', headers: this.headers(), body: JSON.stringify(body),
    });
    const j = (await r.json()) as GenContentResponse;
    if (r.status === 429) {
      throw new Error('Gemini 429 RESOURCE_EXHAUSTED — free-tier generation quota reached (enable billing or wait for the daily reset)');
    }
    if (!r.ok) throw new Error(`Gemini ${r.status}: ${JSON.stringify(j.error?.status ?? j.error?.message ?? j).slice(0, 160)}`);
    return j;
  }

  /** Text reasoning: prompt optimization, asset review, OCR. */
  async reason(prompt: string, model = 'gemini-2.0-flash'): Promise<string> {
    const j = await this.call(model, { contents: [{ parts: [{ text: prompt }] }] });
    const parts = j.candidates?.[0]?.content?.parts ?? [];
    return parts.map((p) => p.text ?? '').join('').trim();
  }

  /** Image generation (Nano Banana). Returns raw bytes; caller stores via M4. */
  async generateImage(prompt: string, opts: { model?: string; aspectRatio?: string } = {}): Promise<GeminiImage> {
    const model = opts.model ?? 'gemini-2.5-flash-image';
    const body: Record<string, unknown> = { contents: [{ parts: [{ text: prompt }] }] };
    if (opts.aspectRatio) body.generationConfig = { imageConfig: { aspectRatio: opts.aspectRatio } };
    const j = await this.call(model, body);
    const parts = j.candidates?.[0]?.content?.parts ?? [];
    const img = parts.find((p) => p.inlineData);
    if (!img?.inlineData) throw new Error('Gemini returned no image (no inlineData part)');
    return { bytes: Uint8Array.from(Buffer.from(img.inlineData.data, 'base64')), mime: img.inlineData.mimeType ?? 'image/png' };
  }
}
