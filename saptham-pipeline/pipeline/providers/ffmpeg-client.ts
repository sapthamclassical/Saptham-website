import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { env } from '../canon/env';

const run = promisify(execFile);

export interface LoopOpts {
  seconds?: number;
  fps?: number;
  zoom?: number; // final zoom factor for the slow push-in
  grain?: number; // film-grain strength (subtle by default; grain inflates file size)
  crf?: number; // quality (higher = smaller); 23 is a good web default
  maxrateK?: number; // bitrate cap in kbps → bounds file size for web delivery
}

/**
 * Build the ffmpeg argv for a seamless, WEB-OPTIMIZED "ambient loop" from ONE still: slow
 * Ken-Burns push-in + subtle temporal grain + soft fade in/out, encoded H.264 with a bitrate
 * cap (so an 8s loop lands in the ~2–6 MB range, not 30+). Pure — unit-testable without exec.
 */
export function buildAmbientLoopArgs(input: string, output: string, w: number, h: number, opts: LoopOpts = {}): string[] {
  const seconds = opts.seconds ?? 8;
  const fps = opts.fps ?? 25;
  const zoom = opts.zoom ?? 1.12;
  const grain = opts.grain ?? 3; // lighter grain → far better compression
  const crf = opts.crf ?? 23;
  const maxrateK = opts.maxrateK ?? 3000;
  const frames = Math.round(seconds * fps);
  const inc = ((zoom - 1) / frames).toFixed(6);
  const fadeOut = (seconds - 0.6).toFixed(2);
  const vf = [
    `scale=${w * 2}:${h * 2}`, // 2x headroom so the zoom stays crisp
    `zoompan=z=min(zoom+${inc}\\,${zoom}):d=${frames}:x=iw/2-(iw/zoom/2):y=ih/2-(ih/zoom/2):s=${w}x${h}:fps=${fps}`,
    `noise=alls=${grain}:allf=t`,
    `fade=t=in:st=0:d=0.6`,
    `fade=t=out:st=${fadeOut}:d=0.6`,
    `format=yuv420p`,
  ].join(',');
  return [
    '-y', '-loop', '1', '-i', input, '-t', String(seconds), '-r', String(fps), '-vf', vf, '-an',
    '-c:v', 'libx264', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-crf', String(crf),
    '-maxrate', `${maxrateK}k`, '-bufsize', `${maxrateK * 2}k`, '-movflags', '+faststart', output,
  ];
}

/** Local FFmpeg client (free). Post-processing: still→ambient-loop, dimensions, duration. */
export class FfmpegClient {
  constructor(
    private readonly bin: string = env.get('FFMPEG_PATH') ?? 'ffmpeg',
    private readonly probe: string = env.get('FFPROBE_PATH') ?? 'ffprobe',
  ) {}

  async version(): Promise<{ up: boolean; detail: string }> {
    try {
      const { stdout } = await run(this.bin, ['-version']);
      return { up: true, detail: (stdout.split('\n')[0] ?? '').slice(0, 60) };
    } catch (e) {
      return { up: false, detail: (e as Error).message.slice(0, 60) };
    }
  }

  async dimensions(input: string): Promise<{ w: number; h: number }> {
    const { stdout } = await run(this.probe, ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=s=x:p=0', input]);
    const [w, h] = stdout.trim().split('x').map(Number);
    if (!w || !h) throw new Error(`could not read dimensions: ${stdout}`);
    return { w, h };
  }

  async duration(input: string): Promise<number> {
    const { stdout } = await run(this.probe, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', input]);
    return parseFloat(stdout.trim());
  }

  async ambientLoop(input: string, output: string, opts: LoopOpts = {}): Promise<void> {
    const { w, h } = await this.dimensions(input);
    await run(this.bin, buildAmbientLoopArgs(input, output, w, h, opts), { maxBuffer: 1 << 26 });
  }

  /** Extract a single poster frame (for review). */
  async posterFrame(input: string, output: string, atSeconds = 1): Promise<void> {
    await run(this.bin, ['-y', '-ss', String(atSeconds), '-i', input, '-frames:v', '1', output], { maxBuffer: 1 << 24 });
  }
}
