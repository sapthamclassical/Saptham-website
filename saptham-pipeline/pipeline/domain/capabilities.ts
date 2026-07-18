import { z } from 'zod';

/**
 * Capability taxonomy (EXTENSION for M3). The router selects by CAPABILITY, not by
 * provider name — providers advertise which of these they can fulfil.
 * The first 12 are the canonical creative capabilities; the last 3 cover local tools.
 */
export const CapabilityTagEnum = z.enum([
  'text_to_image',
  'image_to_image',
  'image_to_video',
  'text_to_video',
  'camera_motion',
  'style_transfer',
  'material_reference',
  'lighting_reference',
  'character_consistency',
  'asset_review',
  'upscaling',
  'svg_generation',
  // local-tool extensions:
  'prompt_enhancement',
  'video_post',
  'model_3d',
]);
export type CapabilityTag = z.infer<typeof CapabilityTagEnum>;

export const ROUTING_CAPABILITIES: readonly CapabilityTag[] = CapabilityTagEnum.options;
