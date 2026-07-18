import type { Provider } from '../base';
import type { Capability, CapabilityTag } from '../../domain';
import { McpBridgeAdapter, type McpInvoker } from './mcp';
import { PixverseAdapter, GeminiAdapter } from './http';
import { ComfyUIAdapter, OllamaAdapter, FFmpegAdapter, BlenderAdapter } from './local';

export * from './mcp';
export * from './http';
export * from './local';

const IMAGE_CAP: Capability = {
  modality: 'image', mode: 'sync', max_resolution: 4096,
  aspect_ratios: ['1:1', '16:9', '9:16', '4:5', '21:9'],
  supports_negative_prompt: false, reference_images: 14, supports_seed: false, formats: ['png', 'webp'],
};
const VIDEO_CAP: Capability = {
  modality: 'video', mode: 'async', max_resolution: 2160,
  aspect_ratios: ['16:9', '9:16', '1:1', '21:9'],
  supports_negative_prompt: false, reference_images: 3, supports_seed: false, formats: ['mp4'],
};

const OPENART_TAGS: CapabilityTag[] = [
  'text_to_image', 'image_to_image', 'image_to_video', 'text_to_video',
  'character_consistency', 'camera_motion', 'style_transfer', 'material_reference',
  'lighting_reference', 'upscaling',
];
const KLING_TAGS: CapabilityTag[] = [
  'text_to_image', 'image_to_image', 'image_to_video', 'text_to_video', 'camera_motion', 'character_consistency',
];
const HIGGSFIELD_TAGS: CapabilityTag[] = ['text_to_image', 'image_to_video', 'text_to_video', 'upscaling', 'camera_motion'];

export interface BuildAdaptersOpts {
  /** Agent-supplied MCP invokers, keyed by provider id (openart/kling/higgsfield). */
  invokers?: Record<string, McpInvoker>;
}

/** Construct the concrete adapter for every provider. MCP adapters are inert without an invoker. */
export function buildAdapters(opts: BuildAdaptersOpts = {}): Record<string, Provider> {
  const inv = opts.invokers ?? {};
  return {
    openart: new McpBridgeAdapter({ id: 'openart', mcpServer: 'bad77fe6-b31c-4d32-a7d7-ab9489d5c106', tags: OPENART_TAGS, capabilities: [IMAGE_CAP, VIDEO_CAP], dynamicCatalog: true, invoker: inv.openart }),
    kling: new McpBridgeAdapter({ id: 'kling', mcpServer: '59437aad-af11-4d6f-8b11-782115db43db', tags: KLING_TAGS, capabilities: [VIDEO_CAP], dynamicCatalog: true, invoker: inv.kling }),
    higgsfield: new McpBridgeAdapter({ id: 'higgsfield', mcpServer: 'b268a533-d2df-450e-bf47-9b0e168bbe33', tags: HIGGSFIELD_TAGS, capabilities: [IMAGE_CAP], dynamicCatalog: true, invoker: inv.higgsfield }),
    pixverse: new PixverseAdapter(),
    gemini: new GeminiAdapter(),
    comfyui: new ComfyUIAdapter(),
    ollama: new OllamaAdapter(),
    ffmpeg: new FFmpegAdapter(),
    blender: new BlenderAdapter(),
  };
}
