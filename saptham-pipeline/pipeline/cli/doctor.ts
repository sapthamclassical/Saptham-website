/** `npm run doctor` — probe every provider/tool for REAL liveness (not just env presence). */
import { execFile } from 'node:child_process';
import { loadDotenv, describeEnv, env } from '../canon/env';
import { ComfyClient } from '../providers/comfy-client';
import { OllamaClient } from '../providers/ollama-client';
import { GeminiClient } from '../providers/gemini-client';

loadDotenv();

/** Actually run a binary (not just check the env var) — closes the presence≠liveness gap. */
function probeBinary(bin: string, args: string[]): Promise<{ up: boolean; detail: string }> {
  return new Promise((resolve) => {
    execFile(bin, args, { timeout: 6000 }, (err, stdout) => {
      if (err) {
        const code = (err as NodeJS.ErrnoException).code;
        resolve({ up: false, detail: code === 'ENOENT' ? 'not found on PATH' : (err.message.split('\n')[0] ?? '').slice(0, 70) });
      } else {
        resolve({ up: true, detail: (stdout.split('\n')[0] ?? '').slice(0, 70) });
      }
    });
  });
}

const [comfy, ollama, gemini, ffmpeg, blender] = await Promise.all([
  new ComfyClient().health(),
  new OllamaClient().health(),
  new GeminiClient().health(),
  probeBinary(env.get('FFMPEG_PATH') ?? 'ffmpeg', ['-version']),
  probeBinary(env.get('BLENDER_PATH') ?? 'blender', ['--version']),
]);

const mark = (up: boolean) => (up ? 'UP  ' : 'DOWN');

console.log('# doctor — real liveness probes');
console.log('env:', describeEnv(['COMFYUI_HOST', 'COMFYUI_TOKEN', 'OLLAMA_HOST', 'GEMINI_API_KEY', 'FFMPEG_PATH', 'BLENDER_PATH', 'PIXVERSE_API_KEY']));
console.log(`ComfyUI  -> ${mark(comfy.up)}  (${comfy.detail})`);
console.log(`Ollama   -> ${mark(ollama.up)}  ${ollama.models.length ? 'models: ' + ollama.models.join(', ') : ''}`);
console.log(`Gemini   -> ${mark(gemini.up)}  (${gemini.detail}${gemini.up ? '; generation quota may be 429-limited' : ''})`);
console.log(`FFmpeg   -> ${mark(ffmpeg.up)}  (${ffmpeg.detail})`);
console.log(`Blender  -> ${mark(blender.up)}  (${blender.detail})`);

const ready = comfy.up || gemini.up;
if (!ready) console.log('\nNo cloud/local image generator is live yet. Start ComfyUI, or resolve Gemini quota.');
if (!ffmpeg.up) console.log('FFmpeg missing → video post (loop/reframe/poster/encode) unavailable.');
