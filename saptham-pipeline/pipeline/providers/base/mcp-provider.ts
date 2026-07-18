import type { Capability, GenerationRequest, GenerationResult, ArtifactRef } from '../../domain';
import type { Provider, JobHandle, ValidationResult } from './provider';
import { capabilityMatches } from './provider';

/**
 * EXTENSION — base class for MCP-backed providers (e.g. the Higgsfield aggregator).
 *
 * Because MCP tools can only be invoked by the agent runtime, concrete MCP adapters
 * are *bridged*: the deterministic core builds the GenerationRequest and calls
 * `submit()`, and the agent-side bridge fulfils `discoverModels()` (via models_explore)
 * and `invokeGenerate()` (via generate_image / generate_video). This keeps the core
 * provider-agnostic while acknowledging the agent-in-the-loop reality.
 */
export abstract class McpProvider implements Provider {
  abstract readonly id: string;
  abstract readonly mcpServer: string;

  protected catalog: Capability[] | null = null;

  /** Bridge point: query the MCP model catalog (models_explore). */
  abstract discoverModels(): Promise<Capability[]>;

  /** Bridge point: run the MCP generate_* tool and normalize to GenerationResult. */
  abstract invokeGenerate(req: GenerationRequest): Promise<GenerationResult>;

  async describeCapabilities(): Promise<Capability[]> {
    if (this.catalog === null) this.catalog = await this.discoverModels();
    return this.catalog;
  }

  validate(req: GenerationRequest): ValidationResult {
    const issues: string[] = [];
    if (this.catalog && !capabilityMatches(this.catalog, req)) {
      issues.push(`${this.id}: no capability matches ${req.modality} @ ${req.aspect_ratio}`);
    }
    return { ok: issues.length === 0, issues };
  }

  estimateCost(_req: GenerationRequest): number {
    return 0; // concrete adapters override via the MCP get_cost preflight
  }

  submit(req: GenerationRequest): Promise<GenerationResult> {
    return this.invokeGenerate(req);
  }

  async poll(_handle: JobHandle): Promise<GenerationResult> {
    throw new Error(`${this.id}: poll() must be overridden for async (video) jobs`);
  }

  async fetch(ref: ArtifactRef): Promise<Uint8Array> {
    if (ref.bytesBase64) return Uint8Array.from(Buffer.from(ref.bytesBase64, 'base64'));
    throw new Error(`${this.id}: fetch() by uri must be implemented by the concrete adapter`);
  }
}
