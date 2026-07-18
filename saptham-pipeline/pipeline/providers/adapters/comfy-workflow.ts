/** ComfyUI API-format txt2img workflow (the canonical SDXL graph), fully parameterized. */
export interface Txt2ImgParams {
  prompt: string;
  negative: string;
  width: number;
  height: number;
  seed: number;
  steps?: number;
  cfg?: number;
  ckpt?: string;
  sampler?: string;
  scheduler?: string;
  filenamePrefix?: string;
}

export function buildTxt2ImgGraph(p: Txt2ImgParams): Record<string, unknown> {
  return {
    '4': { class_type: 'CheckpointLoaderSimple', inputs: { ckpt_name: p.ckpt ?? 'sd_xl_base_1.0.safetensors' } },
    '5': { class_type: 'EmptyLatentImage', inputs: { width: p.width, height: p.height, batch_size: 1 } },
    '6': { class_type: 'CLIPTextEncode', inputs: { text: p.prompt, clip: ['4', 1] } },
    '7': { class_type: 'CLIPTextEncode', inputs: { text: p.negative, clip: ['4', 1] } },
    '3': {
      class_type: 'KSampler',
      inputs: {
        seed: p.seed, steps: p.steps ?? 30, cfg: p.cfg ?? 6.5,
        sampler_name: p.sampler ?? 'dpmpp_2m', scheduler: p.scheduler ?? 'karras', denoise: 1,
        model: ['4', 0], positive: ['6', 0], negative: ['7', 0], latent_image: ['5', 0],
      },
    },
    '8': { class_type: 'VAEDecode', inputs: { samples: ['3', 0], vae: ['4', 2] } },
    '9': { class_type: 'SaveImage', inputs: { images: ['8', 0], filename_prefix: p.filenamePrefix ?? 'saptham' } },
  };
}

/** Map a canonical aspect ratio to ~1MP SDXL dimensions (multiples of 64). */
export function dimsForAspect(ar: string): { width: number; height: number } {
  const map: Record<string, { width: number; height: number }> = {
    '1:1': { width: 1024, height: 1024 },
    '16:9': { width: 1344, height: 768 },
    '9:16': { width: 768, height: 1344 },
    '4:5': { width: 896, height: 1152 },
    '5:4': { width: 1152, height: 896 },
    '3:2': { width: 1216, height: 832 },
    '2:3': { width: 832, height: 1216 },
    '21:9': { width: 1536, height: 640 },
  };
  return map[ar] ?? { width: 1024, height: 1024 };
}
