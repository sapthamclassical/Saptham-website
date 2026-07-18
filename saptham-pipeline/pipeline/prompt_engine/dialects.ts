import type { GenerationRequest } from '../domain';

/**
 * L3 dialect strategy — how a specific provider phrases a request. The default is
 * identity; provider adapters (M3+) supply their own (e.g. folding negatives into
 * the prompt for engines without a native negative field).
 */
export interface Dialect {
  readonly name: string;
  renderPrompt(req: GenerationRequest): string;
  mapAspect(ar: string): string;
}

export const DefaultDialect: Dialect = {
  name: 'default',
  renderPrompt: (req) => req.composed_prompt,
  mapAspect: (ar) => ar,
};

/** For providers lacking a native negative-prompt field: fold negatives into the text. */
export function foldNegatives(req: GenerationRequest): string {
  return req.negative_prompt ? `${req.composed_prompt} Avoid: ${req.negative_prompt}.` : req.composed_prompt;
}
