import { z } from 'zod';
import {
  ModalityEnum, FamilyEnum, PriorityEnum, StatusEnum, JobStateEnum,
  ProviderModalityEnum, ProviderTierEnum, AuthTypeEnum, ProviderKindEnum,
} from './enums';
import { CapabilityTagEnum } from './capabilities';

/* ── Capability & Provider config (DATA_MODELS §6 + EXTENSIONS) ─────────────── */

export const CapabilitySchema = z.object({
  modality: ProviderModalityEnum,
  mode: z.enum(['sync', 'async']),
  max_resolution: z.number().int().positive().optional(),
  aspect_ratios: z.array(z.string()).default([]),
  supports_negative_prompt: z.boolean().default(false),
  reference_images: z.number().int().nonnegative().default(0),
  supports_seed: z.boolean().default(false),
  formats: z.array(z.string()).default([]),
  cost_unit: z.record(z.string(), z.number()).optional(),
  rate_limit: z.object({ rpm: z.number().optional(), concurrency: z.number().optional() }).optional(),
});
export type Capability = z.infer<typeof CapabilitySchema>;

export const AuthRequirementSchema = z.object({
  type: AuthTypeEnum,
  secrets: z.array(z.string()).default([]),
  note: z.string().optional(),
});
export type AuthRequirement = z.infer<typeof AuthRequirementSchema>;

export const ProviderConfigSchema = z.object({
  id: z.string(),
  display_name: z.string(),
  kind: ProviderKindEnum,
  enabled: z.boolean().default(false),
  tier: ProviderTierEnum,
  mcp_server: z.string().optional(),
  dynamic_catalog: z.boolean().default(false),
  models: z.array(z.string()).default([]),
  capabilities: z.array(CapabilitySchema).default([]),
  // EXTENSION (M3): capability-based routing + auth-gate inputs.
  capability_tags: z.array(CapabilityTagEnum).default([]),
  requires_env: z.array(z.string()).default([]), // env vars a local tool needs (path/host)
  connected: z.boolean().default(false), // MCP session connectivity (OAuth/login already done)
  quality: z.number().int().min(1).max(5).default(3),
  endpoint: z.string().optional(),
  auth: AuthRequirementSchema,
  priority: z.record(z.string(), z.number()).optional(),
});
export type ProviderConfig = z.infer<typeof ProviderConfigSchema>;

/* ── Asset / Card / Scene / Batch (DATA_MODELS §3,4,9) ──────────────────────── */

export const AssetSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  batch: z.string(),
  family: FamilyEnum,
  modality: ModalityEnum,
  priority: PriorityEnum,
  scenes: z.array(z.string()).default([]),
  transparent_bg: z.union([z.boolean(), z.literal('variant')]).default(false),
  resolution: z.string(),
  aspect_ratio: z.string(),
  can_3d: z.enum(['Y', '~', 'N']).default('N'),
  reuse: z.enum(['Global', 'Multi', 'Single']).default('Single'),
  derives_from: z.string().nullable().default(null),
  naming: z.string(),
});
export type Asset = z.infer<typeof AssetSchema>;

export const MemberSchema = z.object({ key: z.string(), subject: z.string() });

export const PromptCardSchema = z.object({
  asset_id: z.string(),
  subject: z.string(),
  composition: z.string().default(''),
  lighting: z.string().default(''),
  materials: z.string().default(''),
  color_palette: z.string().default(''),
  camera_angle: z.string().default(''),
  background: z.string().default(''),
  texture: z.string().default(''),
  symmetry: z.string().default(''),
  constraints: z.string().default(''),
  negative_delta: z.string().default(''),
  output_format: z.string().default(''),
  aspect_ratio: z.string().optional(),
  members: z.array(MemberSchema).optional(),
  variants: z.number().int().positive().default(4),
  provider_hint: z.string().optional(),
  reference_ids: z.array(z.string()).optional(),
});
export type PromptCard = z.infer<typeof PromptCardSchema>;

export const SceneSchema = z.object({
  id: z.string(),
  name: z.string(),
  swara: z.string().optional(),
  order: z.number().int(),
  route: z.string().optional(),
  priority: PriorityEnum,
  required_assets: z.array(z.string()).default([]),
});
export type Scene = z.infer<typeof SceneSchema>;

export const BatchSchema = z.object({
  id: z.string(),
  family: FamilyEnum,
  order: z.number().int(),
  anchor_asset: z.string().nullable().default(null),
  members: z.array(z.string()).default([]),
});
export type Batch = z.infer<typeof BatchSchema>;

/* ── Generation request / result (DATA_MODELS §5,7) ─────────────────────────── */

export const ReferenceImageSchema = z.object({
  id: z.string(),
  role: z.string().default('reference'),
  uri: z.string().optional(),
});

export const GenerationRequestSchema = z.object({
  request_id: z.string(),
  asset_id: z.string(),
  version: z.string().default('v1'),
  modality: ModalityEnum,
  family: FamilyEnum,
  composed_prompt: z.string(),
  negative_prompt: z.string().default(''),
  aspect_ratio: z.string(),
  resolution: z.string(),
  seed: z.number().int().nullable().default(null),
  num_variants: z.number().int().positive().default(4),
  reference_images: z.array(ReferenceImageSchema).default([]),
  scene_id: z.string().nullable().default(null),
  prompt_hash: z.string(),
  provider_hint: z.string().nullable().default(null),
  cost_ceiling: z.number().nullable().default(null),
  params: z.record(z.string(), z.unknown()).default({}),
});
export type GenerationRequest = z.infer<typeof GenerationRequestSchema>;

export const ArtifactRefSchema = z.object({
  uri: z.string().optional(),
  bytesBase64: z.string().optional(),
  mime: z.string(),
  width: z.number().int().optional(),
  height: z.number().int().optional(),
  duration: z.number().optional(),
  seed_used: z.number().int().nullable().default(null),
  variant_index: z.number().int(),
});
export type ArtifactRef = z.infer<typeof ArtifactRefSchema>;

export const ErrorInfoSchema = z.object({
  code: z.string(),
  retryable: z.boolean(),
  message: z.string(),
});
export type ErrorInfo = z.infer<typeof ErrorInfoSchema>;

export const GenerationResultSchema = z.object({
  request_id: z.string(),
  provider: z.string(),
  model: z.string(),
  state: JobStateEnum,
  job_handle: z.string().nullable().default(null),
  artifacts: z.array(ArtifactRefSchema).default([]),
  revised_prompt: z.string().nullable().default(null),
  latency_ms: z.number().int().default(0),
  cost: z.number().default(0),
  raw_response_ref: z.string().nullable().default(null),
  error: ErrorInfoSchema.nullable().default(null),
});
export type GenerationResult = z.infer<typeof GenerationResultSchema>;

/* ── Artifact & version (DATA_MODELS §8) ────────────────────────────────────── */

export const ProvenanceSchema = z.object({
  prompt_hash: z.string(),
  provider: z.string(),
  model: z.string(),
  seed: z.number().int().nullable().default(null),
  reference_ids: z.array(z.string()).default([]),
  request_id: z.string(),
  run_id: z.string(),
});

export const AcceptanceSchema = z.object({
  passed: z.boolean().nullable().default(null),
  notes: z.string().default(''),
  reviewer: z.string().default(''),
  ts: z.string().nullable().default(null),
});

export const ArtifactSchema = z.object({
  artifact_id: z.string(),
  content_hash: z.string(),
  asset_id: z.string(),
  version: z.string(),
  variant: z.string(),
  path: z.string(),
  mime: z.string(),
  width: z.number().int().optional(),
  height: z.number().int().optional(),
  duration: z.number().optional(),
  status: StatusEnum,
  provenance: ProvenanceSchema,
  acceptance: AcceptanceSchema.default({}),
  created_at: z.string(),
});
export type Artifact = z.infer<typeof ArtifactSchema>;

export const VersionRecordSchema = z.object({
  version: z.string(),
  status: StatusEnum,
  parent: z.string().nullable().default(null),
  variants: z.array(z.string()).default([]),
  approved: z.string().nullable().default(null),
  prompt_hash: z.string().optional(),
  run_id: z.string().optional(),
});

export const AssetVersionSchema = z.object({
  asset_id: z.string(),
  current: z
    .object({ version: z.string(), published_variant: z.string().nullable().default(null) })
    .nullable()
    .default(null),
  versions: z.array(VersionRecordSchema).default([]),
});
export type AssetVersion = z.infer<typeof AssetVersionSchema>;

/* ── Run / job / cost / log (DATA_MODELS §10) ───────────────────────────────── */

export const JobSchema = z.object({
  job_id: z.string(),
  run_id: z.string(),
  asset_id: z.string(),
  version: z.string(),
  variant_target: z.number().int(),
  request_id: z.string(),
  state: JobStateEnum,
  provider: z.string().nullable().default(null),
  attempts: z.number().int().default(0),
  last_error: z.string().nullable().default(null),
  artifact_ids: z.array(z.string()).default([]),
});
export type Job = z.infer<typeof JobSchema>;

export const CostEntrySchema = z.object({
  ts: z.string(),
  run_id: z.string(),
  job_id: z.string(),
  provider: z.string(),
  model: z.string(),
  units: z.number(),
  cost: z.number(),
});
export type CostEntry = z.infer<typeof CostEntrySchema>;

export const LogEventSchema = z.object({
  ts: z.string(),
  level: z.enum(['debug', 'info', 'warn', 'error']),
  run_id: z.string().optional(),
  job_id: z.string().optional(),
  asset_id: z.string().optional(),
  event: z.string(),
  data: z.record(z.string(), z.unknown()).optional(),
});
export type LogEvent = z.infer<typeof LogEventSchema>;

export const RunManifestSchema = z.object({
  run_id: z.string(),
  ts: z.string(),
  target: z.string(),
  resolved_jobs: z.array(z.string()).default([]),
  policy: z.record(z.string(), z.unknown()).default({}),
  totals: z
    .object({
      cost: z.number().default(0),
      count: z.number().int().default(0),
      retries: z.number().int().default(0),
      duration: z.number().default(0),
    })
    .default({ cost: 0, count: 0, retries: 0, duration: 0 }),
  dlq_count: z.number().int().default(0),
});
export type RunManifest = z.infer<typeof RunManifestSchema>;
