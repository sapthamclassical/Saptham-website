import type {
  Capability, GenerationRequest, GenerationResult, ArtifactRef,
} from '../../domain';
import type { Provider, JobHandle, ValidationResult } from './provider';

/** A 1×1 transparent PNG — lets downstream milestones test storage/versioning offline. */
const TINY_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

/**
 * Contract stand-in used across M4/M5/M8 so the whole pipeline is testable with
 * zero credentials and zero credits. (IMPLEMENTATION_PLAN M0 DoD.)
 */
export class FakeProvider implements Provider {
  readonly id = 'fake';

  describeCapabilities(): Capability[] {
    return [
      {
        modality: 'image',
        mode: 'sync',
        max_resolution: 4096,
        aspect_ratios: ['1:1', '16:9', '4:5', '21:9'],
        supports_negative_prompt: false,
        reference_images: 1,
        supports_seed: true,
        formats: ['png'],
      },
    ];
  }

  validate(_req: GenerationRequest): ValidationResult {
    return { ok: true, issues: [] };
  }

  estimateCost(_req: GenerationRequest): number {
    return 0;
  }

  async submit(req: GenerationRequest): Promise<GenerationResult> {
    const artifacts: ArtifactRef[] = Array.from({ length: req.num_variants }, (_, i) => ({
      bytesBase64: TINY_PNG_BASE64,
      mime: 'image/png',
      width: 1,
      height: 1,
      seed_used: (req.seed ?? 0) + i,
      variant_index: i,
    }));
    return {
      request_id: req.request_id,
      provider: this.id,
      model: 'fake-1',
      state: 'succeeded',
      job_handle: null,
      artifacts,
      revised_prompt: null,
      latency_ms: 1,
      cost: 0,
      raw_response_ref: null,
      error: null,
    };
  }

  async poll(_handle: JobHandle): Promise<GenerationResult> {
    throw new Error('FakeProvider is synchronous; poll() is never used');
  }

  async fetch(ref: ArtifactRef): Promise<Uint8Array> {
    return Uint8Array.from(Buffer.from(ref.bytesBase64 ?? '', 'base64'));
  }
}
