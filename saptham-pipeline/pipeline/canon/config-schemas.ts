import { z } from 'zod';
import { ProviderConfigSchema, ProviderTierEnum, PriorityEnum } from '../domain';

/* ── canon.yaml (DATA_MODELS §2) ────────────────────────────────────────────── */
export const CanonSchema = z.object({
  version: z.string(),
  gsc: z.string().min(1),
  tokens: z.object({
    palette: z.record(z.string(), z.string()),
    gold_gradient: z.array(z.string()).length(3),
    swara_hues: z.record(z.string(), z.string()),
  }),
  neg_presets: z.record(z.string(), z.string()),
  families: z.record(z.string(), z.record(z.string(), z.unknown())),
  naming_convention: z.string(),
  acceptance_test: z.array(z.string()).min(1),
});
export type Canon = z.infer<typeof CanonSchema>;

/* ── providers.yaml ─────────────────────────────────────────────────────────── */
export const ProvidersConfigSchema = z.object({
  providers: z.array(ProviderConfigSchema).min(1),
});
export type ProvidersConfig = z.infer<typeof ProvidersConfigSchema>;

/* ── policy.yaml (routing + governance, incl. free-first) ───────────────────── */
export const PolicySchema = z.object({
  free_first: z.boolean().default(true),
  tier_order: z.array(ProviderTierEnum).min(1),
  cost: z.object({
    per_run_ceiling: z.number().nullable().default(null),
    require_confirm_over: z.number().nullable().default(null),
  }),
  retry: z.object({
    max_attempts: z.number().int().positive(),
    backoff_base_ms: z.number().int().positive(),
    jitter: z.boolean(),
  }),
  concurrency: z.object({
    global: z.number().int().positive(),
    per_provider: z.number().int().positive(),
  }),
  circuit_breaker: z.object({
    failures_to_open: z.number().int().positive(),
    cooldown_ms: z.number().int().positive(),
  }),
  approval: z.object({ require_acceptance_for: z.array(PriorityEnum) }),
  variants_default: z.number().int().positive().default(4),
});
export type Policy = z.infer<typeof PolicySchema>;
