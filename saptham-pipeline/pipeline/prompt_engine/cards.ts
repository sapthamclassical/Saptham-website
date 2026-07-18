import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { PromptCardSchema, type PromptCard } from '../domain';

/** Load a Prompt Card `vault/cards/<batch>/<ID>.yaml`. */
export function loadCard(id: string, batch: string, dir = 'vault/cards'): PromptCard {
  const path = join(dir, batch, `${id}.yaml`);
  return PromptCardSchema.parse(parse(readFileSync(path, 'utf8')));
}
