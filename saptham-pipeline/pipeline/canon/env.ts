import { readFileSync } from 'node:fs';

/**
 * Minimal .env loader (no dependency). Populates process.env from `.env` WITHOUT
 * overwriting already-set vars. Secrets are read here and NEVER logged or returned
 * in diagnostics — only presence ('set' / 'missing') is ever exposed.
 */
export function loadDotenv(path = '.env'): void {
  let raw: string;
  try {
    raw = readFileSync(path, 'utf8');
  } catch {
    return; // no .env is fine — env may be provided by the host
  }
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 0) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

export interface EnvReader {
  has(name: string): boolean;
  get(name: string): string | undefined;
}

/** Read-only accessor. `get` is for internal use (building auth headers); values are never logged. */
export const env: EnvReader = {
  has: (n) => typeof process.env[n] === 'string' && process.env[n]!.trim().length > 0,
  get: (n) => process.env[n],
};

/** Safe diagnostic: reports only presence, never the secret value. */
export function describeEnv(names: string[]): Record<string, 'set' | 'missing'> {
  return Object.fromEntries(names.map((n) => [n, env.has(n) ? 'set' : 'missing']));
}
