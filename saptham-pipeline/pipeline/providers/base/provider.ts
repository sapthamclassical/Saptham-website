import type {
  Capability, GenerationRequest, GenerationResult, ArtifactRef,
} from '../../domain';

/** Opaque handle for async (video) jobs the router persists and polls. */
export interface JobHandle {
  provider: string;
  handle: string;
}

export interface ValidationResult {
  ok: boolean;
  issues: string[];
}

/**
 * L4 Provider interface — the single contract every adapter satisfies
 * (MCP, HTTP, or local OSS). The core knows only this shape; vendor quirks
 * live inside implementations. (SYSTEM_ARCHITECTURE §4.5.)
 */
export interface Provider {
  readonly id: string;
  describeCapabilities(): Promise<Capability[]> | Capability[];
  validate(req: GenerationRequest): ValidationResult;
  estimateCost(req: GenerationRequest): Promise<number> | number;
  submit(req: GenerationRequest): Promise<GenerationResult>;
  poll(handle: JobHandle): Promise<GenerationResult>;
  fetch(ref: ArtifactRef): Promise<Uint8Array>;
}

/** Shared helper: does any of a provider's capabilities cover this request's modality + AR? */
export function capabilityMatches(caps: Capability[], req: GenerationRequest): boolean {
  return caps.some(
    (c) =>
      c.modality === (req.modality === 'video' ? 'video' : 'image') &&
      (c.aspect_ratios.length === 0 || c.aspect_ratios.includes(req.aspect_ratio)),
  );
}
