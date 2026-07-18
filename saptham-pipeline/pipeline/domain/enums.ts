import { z } from 'zod';

/** Shared enums (DATA_MODELS.md §1). */
export const ModalityEnum = z.enum(['image', 'video', 'vector-source', '3d-ref']);
export type Modality = z.infer<typeof ModalityEnum>;

export const FamilyEnum = z.enum(['A', 'B', 'C-tex', 'C-particle', 'photo', 'assembly']);
export type Family = z.infer<typeof FamilyEnum>;

export const PriorityEnum = z.enum(['C', 'H', 'M', 'L']);
export type Priority = z.infer<typeof PriorityEnum>;

export const StatusEnum = z.enum([
  'draft', 'candidate', 'approved', 'published', 'deprecated', 'failed',
]);
export type Status = z.infer<typeof StatusEnum>;

export const JobStateEnum = z.enum([
  'queued', 'running', 'awaiting_poll', 'succeeded', 'retrying', 'dead_letter',
]);
export type JobState = z.infer<typeof JobStateEnum>;

export const ProviderModalityEnum = z.enum(['image', 'video', 'audio', '3d']);
export type ProviderModality = z.infer<typeof ProviderModalityEnum>;

/** Free-first tiers (EXTENSION: policy ranks candidates by tier before cost). */
export const ProviderTierEnum = z.enum([
  'free_credits', 'free_mcp', 'free_api', 'local_oss', 'paid',
]);
export type ProviderTier = z.infer<typeof ProviderTierEnum>;

/** How a provider authenticates (EXTENSION: drives the AuthGate). */
export const AuthTypeEnum = z.enum(['none', 'mcp_session', 'api_key', 'oauth', 'login']);
export type AuthType = z.infer<typeof AuthTypeEnum>;

/** Provider transport kind (EXTENSION: MCP vs HTTP vs local OSS). */
export const ProviderKindEnum = z.enum(['mcp', 'http', 'local']);
export type ProviderKind = z.infer<typeof ProviderKindEnum>;
