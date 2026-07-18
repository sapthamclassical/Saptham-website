import { env } from '../canon/env';

export interface ComfyImageRef {
  filename: string;
  subfolder: string;
  type: string;
}

export interface PollOpts {
  intervalMs?: number;
  timeoutMs?: number;
  sleep?: (ms: number) => Promise<void>;
}

/**
 * Local ComfyUI HTTP client (free). Submits an API-format workflow graph, polls history,
 * and fetches the rendered image bytes. Auth token (if set) is sent as a Bearer header and
 * never logged. Unlike MCP providers this runs headless — the free bulk-generation path.
 */
export class ComfyClient {
  constructor(
    private readonly host: string = env.get('COMFYUI_HOST') ?? 'http://127.0.0.1:8188',
    private readonly token: string | undefined = env.get('COMFYUI_TOKEN'),
  ) {}

  private headers(json = false): Record<string, string> {
    return {
      ...(json ? { 'Content-Type': 'application/json' } : {}),
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
    };
  }

  async health(): Promise<{ up: boolean; detail: string }> {
    try {
      const r = await fetch(`${this.host}/system_stats`, { headers: this.headers() });
      return { up: r.ok, detail: r.ok ? 'reachable' : `HTTP ${r.status}` };
    } catch (e) {
      return { up: false, detail: (e as Error).message };
    }
  }

  async submit(graph: Record<string, unknown>): Promise<string> {
    const r = await fetch(`${this.host}/prompt`, {
      method: 'POST', headers: this.headers(true), body: JSON.stringify({ prompt: graph }),
    });
    if (!r.ok) throw new Error(`comfy /prompt ${r.status}: ${await r.text()}`);
    const j = (await r.json()) as { prompt_id?: string; node_errors?: Record<string, unknown> };
    if (!j.prompt_id) throw new Error(`comfy /prompt returned no prompt_id: ${JSON.stringify(j.node_errors ?? {})}`);
    return j.prompt_id;
  }

  async pollImages(promptId: string, opts: PollOpts = {}): Promise<ComfyImageRef[]> {
    const interval = opts.intervalMs ?? 1500;
    const timeout = opts.timeoutMs ?? 300000;
    const sleep = opts.sleep ?? ((ms: number) => new Promise<void>((res) => setTimeout(res, ms)));
    const deadline = Date.now() + timeout;
    for (;;) {
      const r = await fetch(`${this.host}/history/${promptId}`, { headers: this.headers() });
      if (r.ok) {
        const j = (await r.json()) as Record<string, { outputs?: Record<string, { images?: ComfyImageRef[] }> }>;
        const entry = j[promptId];
        if (entry?.outputs) {
          const imgs = Object.values(entry.outputs).flatMap((o) => o.images ?? []).filter((i) => i.type !== 'temp');
          if (imgs.length) return imgs;
        }
      }
      if (Date.now() > deadline) throw new Error('comfy poll timeout');
      await sleep(interval);
    }
  }

  async fetchImage(ref: ComfyImageRef): Promise<Uint8Array> {
    const q = new URLSearchParams({ filename: ref.filename, subfolder: ref.subfolder, type: ref.type });
    const r = await fetch(`${this.host}/view?${q.toString()}`, { headers: this.headers() });
    if (!r.ok) throw new Error(`comfy /view ${r.status}`);
    return new Uint8Array(await r.arrayBuffer());
  }
}
