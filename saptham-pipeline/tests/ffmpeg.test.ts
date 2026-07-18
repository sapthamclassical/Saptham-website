import { describe, it, expect } from 'vitest';
import { buildAmbientLoopArgs } from '../pipeline/providers';

describe('FFmpeg · ambient-loop command', () => {
  const args = buildAmbientLoopArgs('in.png', 'out.mp4', 928, 1152, { seconds: 8, fps: 25 });
  const vf = args[args.indexOf('-vf') + 1] ?? '';

  it('loops a single still for the requested duration', () => {
    expect(args).toContain('-loop');
    expect(args).toContain('in.png');
    expect(args[args.indexOf('-t') + 1]).toBe('8');
    expect(args.at(-1)).toBe('out.mp4');
  });

  it('applies push-in (zoompan), grain, fades and a web-safe encode', () => {
    expect(vf).toContain('zoompan=');
    expect(vf).toContain('s=928x1152'); // output keeps source dimensions
    expect(vf).toContain('noise=');
    expect(vf).toContain('fade=t=in');
    expect(vf).toContain('fade=t=out');
    expect(vf).toContain('format=yuv420p');
    expect(args).toContain('libx264');
  });

  it('is web-optimized: bitrate cap, CRF, faststart, no audio', () => {
    expect(args).toContain('-maxrate');
    expect(args).toContain('-crf');
    expect(args).toContain('+faststart');
    expect(args).toContain('-an');
  });

  it('escapes the comma inside the zoom expression (ffmpeg filtergraph safety)', () => {
    expect(vf).toMatch(/min\(zoom\+[\d.]+\\,1\.12\)/);
  });
});
