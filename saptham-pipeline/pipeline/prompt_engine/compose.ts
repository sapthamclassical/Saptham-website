import { createHash } from 'node:crypto';
import { GenerationRequestSchema, type GenerationRequest, type PromptCard, type Family } from '../domain';
import type { Canon } from '../canon/config-schemas';
import type { RegistryAsset } from '../registry/schemas';

const SWARA_TOKEN = /swara:(Sa|Ri|Ga|Ma|Pa|Da|Ni)/g;
const NEG_KEYS = ['A', 'B', 'C-tex', 'C-particle', 'photo'] as const;
const REQ_FAMILIES: readonly Family[] = ['A', 'B', 'C-tex', 'C-particle', 'photo', 'assembly'];

/** Resolve swara tints: explicit `swara:Pa` tokens and the scene-driven `{{swara}}` placeholder. */
function resolveSwara(text: string, hues: Record<string, string>, sceneSwara?: string | null): string {
  let t = text.replace(SWARA_TOKEN, (m, s: string) => hues[s] ?? m);
  if (sceneSwara && hues[sceneSwara]) t = t.replaceAll('{{swara}}', hues[sceneSwara]);
  return t;
}

function negKey(family: string): string {
  return (NEG_KEYS as readonly string[]).includes(family) ? family : '';
}

export interface ComposeOpts {
  sceneSwara?: string | null;
  sceneId?: string | null;
  version?: string;
}

/**
 * L3 Prompt Engine — deterministic `PromptCard + Canon → GenerationRequest`.
 * composed_prompt = GSC ⊕ subject ⊕ fields (family-aware lighting override);
 * negative = neg_presets[family] ⊕ card.negative_delta; swara tints resolved;
 * prompt_hash = sha256(composed | negative | aspect | reference_ids). Idempotent.
 */
export function composeRequest(
  card: PromptCard,
  asset: RegistryAsset,
  canon: Canon,
  opts: ComposeOpts = {},
): GenerationRequest {
  const family = asset.family ?? 'B';
  const familyCfg = (canon.families as Record<string, { lighting_override?: string | null }>)[family];
  const lighting = familyCfg?.lighting_override ?? card.lighting; // family A/C override GSC chiaroscuro

  const hues = canon.tokens.swara_hues;
  const color = resolveSwara(card.color_palette, hues, opts.sceneSwara);

  const composed_prompt = [
    canon.gsc,
    card.subject,
    card.composition,
    lighting,
    card.materials,
    color,
    card.camera_angle,
    card.background,
    card.texture,
    card.symmetry,
    card.constraints,
  ]
    .map((s) => (s ?? '').trim())
    .filter(Boolean)
    .join(' ');

  const preset = (canon.neg_presets as Record<string, string>)[negKey(family)] ?? '';
  const negative_prompt = [preset, card.negative_delta]
    .map((s) => s.trim())
    .filter(Boolean)
    .join(', ');

  const aspect_ratio = card.aspect_ratio ?? '1:1';

  const references = [
    { id: 'STYLE-00', role: 'style_anchor' },
    ...(asset.batch ? [{ id: asset.batch, role: 'batch_anchor' }] : []),
  ];
  const refIds = references.map((r) => r.id).join(',');

  const prompt_hash = createHash('sha256')
    .update([composed_prompt, negative_prompt, aspect_ratio, refIds].join('|'))
    .digest('hex');

  const reqFamily: Family = REQ_FAMILIES.includes(family as Family) ? (family as Family) : 'B';

  return GenerationRequestSchema.parse({
    request_id: `compose:${asset.id}:${opts.version ?? 'v1'}`,
    asset_id: asset.id,
    version: opts.version ?? 'v1',
    modality: asset.modality,
    family: reqFamily,
    composed_prompt,
    negative_prompt,
    aspect_ratio,
    resolution: asset.resolution || '',
    num_variants: card.variants,
    reference_images: references,
    scene_id: opts.sceneId ?? null,
    prompt_hash,
  });
}
