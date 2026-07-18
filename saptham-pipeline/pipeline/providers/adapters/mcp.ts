import type { Capability, GenerationRequest, GenerationResult, ArtifactRef, CapabilityTag } from '../../domain';
import type { Provider, JobHandle, ValidationResult } from '../base';

/** The agent runtime supplies this to actually invoke the MCP generate tool (openart_generate_image, etc.). */
export type McpInvoker = (req: GenerationRequest) => Promise<GenerationResult>;

export interface McpAdapterCfg {
  id: string;
  mcpServer: string;
  tags: CapabilityTag[];
  capabilities: Capability[];
  dynamicCatalog: boolean;
  invoker?: McpInvoker;
}

/**
 * Agent-bridged MCP adapter. MCP tools can only be called by the agent runtime, so the
 * deterministic core builds the request and calls submit(); the agent supplies `invoker`
 * to execute it (dynamic model discovery via models_explore / openart_model_list). Headless
 * submit() without an invoker throws a clear, typed error rather than silently no-op'ing.
 */
export class McpBridgeAdapter implements Provider {
  constructor(private readonly cfg: McpAdapterCfg) {}

  get id(): string {
    return this.cfg.id;
  }
  get tags(): CapabilityTag[] {
    return this.cfg.tags;
  }
  get dynamicCatalog(): boolean {
    return this.cfg.dynamicCatalog;
  }

  describeCapabilities(): Capability[] {
    return this.cfg.capabilities;
  }

  validate(_req: GenerationRequest): ValidationResult {
    return { ok: true, issues: [] };
  }

  estimateCost(_req: GenerationRequest): number {
    return 0; // preflighted live via the MCP get_cost / openart_model_cost bridge
  }

  async submit(req: GenerationRequest): Promise<GenerationResult> {
    if (!this.cfg.invoker) {
      throw new Error(
        `${this.id}: MCP adapter needs an agent-supplied invoker (bridge not wired in headless mode)`,
      );
    }
    return this.cfg.invoker(req);
  }

  async poll(_handle: JobHandle): Promise<GenerationResult> {
    throw new Error(`${this.id}: async poll is fulfilled via the MCP bridge (M4)`);
  }

  async fetch(ref: ArtifactRef): Promise<Uint8Array> {
    if (ref.bytesBase64) return Uint8Array.from(Buffer.from(ref.bytesBase64, 'base64'));
    throw new Error(`${this.id}: fetch-by-uri is fulfilled via the MCP bridge (M4)`);
  }
}
