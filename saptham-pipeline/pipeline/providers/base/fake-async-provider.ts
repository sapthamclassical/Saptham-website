import type { Capability, GenerationRequest, GenerationResult, ArtifactRef } from '../../domain';
import type { Provider, JobHandle, ValidationResult } from './provider';

// Tiny placeholder payload (bytes only need to round-trip through storage in tests).
const TINY_MP4_B64 = 'AAAAHGZ0eXBtcDQyAAAAAG1wNDJpc29tYXZjMQ==';

/**
 * Async test double: submit() returns `awaiting_poll` + a job_handle; poll() returns
 * `running` until `succeedAfter` polls, then `succeeded` with an mp4 artifact. Models the
 * real video providers (submit→poll→fetch) for offline durable-queue tests.
 */
export class FakeAsyncProvider implements Provider {
  readonly id = 'fake-async';
  private readonly attempts = new Map<string, number>();

  constructor(private readonly succeedAfter = 2) {}

  describeCapabilities(): Capability[] {
    return [{ modality: 'video', mode: 'async', aspect_ratios: ['16:9'], supports_negative_prompt: false, reference_images: 1, supports_seed: false, formats: ['mp4'] }];
  }
  validate(): ValidationResult {
    return { ok: true, issues: [] };
  }
  estimateCost(): number {
    return 0;
  }

  async submit(req: GenerationRequest): Promise<GenerationResult> {
    return base(req.request_id, 'awaiting_poll', `handle-${req.request_id}`, []);
  }

  async poll(handle: JobHandle): Promise<GenerationResult> {
    const n = (this.attempts.get(handle.handle) ?? 0) + 1;
    this.attempts.set(handle.handle, n);
    if (n < this.succeedAfter) return base(handle.handle, 'running', handle.handle, []);
    return base(handle.handle, 'succeeded', handle.handle, [
      { bytesBase64: TINY_MP4_B64, mime: 'video/mp4', seed_used: null, variant_index: 0 },
    ]);
  }

  async fetch(ref: ArtifactRef): Promise<Uint8Array> {
    if (ref.bytesBase64) return Uint8Array.from(Buffer.from(ref.bytesBase64, 'base64'));
    throw new Error('fetch by uri unsupported in fake-async');
  }
}

function base(reqId: string, state: GenerationResult['state'], handle: string, artifacts: ArtifactRef[]): GenerationResult {
  return {
    request_id: reqId, provider: 'fake-async', model: 'fake-video-1', state, job_handle: handle,
    artifacts, revised_prompt: null, latency_ms: 1, cost: 0, raw_response_ref: null, error: null,
  };
}
