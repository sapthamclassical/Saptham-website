import { z } from 'zod';
import { ModalityEnum, PriorityEnum } from '../domain';

/**
 * Registry schemas are the *ingestion* shapes: looser than the strict domain
 * contracts because docs are parsed mechanically, then hand-verified. `batch`,
 * `family`, and `scenes` are filled by the join step; unresolved fields are
 * flagged in the gap report rather than failing the ingest.
 */
export const RegistryAssetSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  sections_raw: z.array(z.string()).default([]),
  priority: PriorityEnum,
  static_animated: z.string().default('S'),
  modality: ModalityEnum,
  transparent_bg: z.union([z.boolean(), z.literal('variant')]).default(false),
  resolution: z.string().default(''),
  reuse: z.enum(['Global', 'Multi', 'Single']).default('Single'),
  can_3d: z.enum(['Y', '~', 'N']).default('N'),
  derives_from: z.string().nullable().default(null),
  batch: z.string().nullable().default(null),
  family: z.string().nullable().default(null),
  scenes: z.array(z.string()).default([]),
});
export type RegistryAsset = z.infer<typeof RegistryAssetSchema>;

export const RegistryBatchSchema = z.object({
  id: z.string(),
  name: z.string(),
  family: z.string(), // A | B | C-tex | C-particle | photo | assembly | 3D | ref | ?
  order: z.number().int(),
  anchor_asset: z.string().nullable().default(null),
  members: z.array(z.string()).default([]),
});
export type RegistryBatch = z.infer<typeof RegistryBatchSchema>;

export const RegistrySceneSchema = z.object({
  id: z.string(),
  name: z.string(),
  swara: z.string().nullable().default(null),
  order: z.number().int(),
  route: z.string().nullable().default(null),
  priority: PriorityEnum.default('H'),
  required_assets: z.array(z.string()).default([]),
});
export type RegistryScene = z.infer<typeof RegistrySceneSchema>;
