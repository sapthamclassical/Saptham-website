import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { z } from 'zod';
import { CanonSchema, ProvidersConfigSchema, PolicySchema } from './config-schemas';
import type { Canon, ProvidersConfig, Policy } from './config-schemas';

/** Load one YAML file and validate it against a schema; throw a readable error on failure. */
function loadYamlFile<S extends z.ZodTypeAny>(path: string, schema: S, label: string): z.output<S> {
  let raw: string;
  try {
    raw = readFileSync(path, 'utf8');
  } catch {
    throw new Error(`[canon] cannot read ${label}: ${path}`);
  }
  let data: unknown;
  try {
    data = parse(raw);
  } catch (e) {
    throw new Error(`[canon] invalid YAML in ${label} (${path}): ${(e as Error).message}`);
  }
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join('.') || '(root)'}: ${i.message}`)
      .join('\n');
    throw new Error(`[canon] ${label} failed validation:\n${issues}`);
  }
  return parsed.data;
}

export interface CanonBundle {
  canon: Canon;
  providers: ProvidersConfig;
  policy: Policy;
}

/** Load + validate the three config files that constitute L0 (the machine-readable Design Bible). */
export function loadCanonBundle(dir = 'vault/canon'): CanonBundle {
  return {
    canon: loadYamlFile(join(dir, 'canon.yaml'), CanonSchema, 'canon.yaml'),
    providers: loadYamlFile(join(dir, 'providers.yaml'), ProvidersConfigSchema, 'providers.yaml'),
    policy: loadYamlFile(join(dir, 'policy.yaml'), PolicySchema, 'policy.yaml'),
  };
}
