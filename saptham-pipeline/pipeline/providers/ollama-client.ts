import { env } from '../canon/env';

/**
 * Local Ollama reasoning client (free). Provides the prompt-enhancement / decomposition
 * step that feeds ComfyUI image workflows. Brand-aware but conservative: it ADDS concrete
 * visual detail without changing the canon style, palette, or removing constraints.
 */
export class OllamaClient {
  constructor(private readonly host: string = env.get('OLLAMA_HOST') ?? 'http://127.0.0.1:11434') {}

  private static readonly SYSTEM =
    'You are a prompt engineer for the Saptham brand: South Indian classical arts, warm candlelit ' +
    'chiaroscuro, antique temple-brass gold on deep warm near-black, museum-grade restraint. Enhance the ' +
    'given image prompt with concrete, specific visual detail (materials, how light behaves, composition) ' +
    'WITHOUT changing the style, palette, aspect ratio, or removing any existing constraint. Keep it under ' +
    '150 words. Output ONLY the enhanced prompt — no preamble, no quotes, no commentary.';

  async health(): Promise<{ up: boolean; models: string[] }> {
    try {
      const r = await fetch(`${this.host}/api/tags`);
      if (!r.ok) return { up: false, models: [] };
      const j = (await r.json()) as { models?: { name: string }[] };
      return { up: true, models: (j.models ?? []).map((m) => m.name) };
    } catch {
      return { up: false, models: [] };
    }
  }

  /** Request body for `/api/generate` (pure — unit-testable without a live server). */
  buildEnhanceBody(prompt: string, model: string) {
    return { model, system: OllamaClient.SYSTEM, prompt, stream: false };
  }

  async enhance(prompt: string, model = 'llama3.2'): Promise<string> {
    const r = await fetch(`${this.host}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.buildEnhanceBody(prompt, model)),
    });
    if (!r.ok) throw new Error(`ollama /api/generate ${r.status}`);
    const j = (await r.json()) as { response?: string };
    return (j.response ?? '').trim();
  }
}
