import type { ProviderConfig, CapabilityTag } from '../domain';
import { AuthGate, type AuthStatus } from './auth-gate';

export interface RouteQuery {
  capability: CapabilityTag;
  aspectRatio?: string;
}

export interface Candidate {
  provider: string;
  tier: string;
  quality: number;
  auth: AuthStatus;
}

export interface RouteResult {
  capability: CapabilityTag;
  candidates: Candidate[]; // full ranked fallback chain
  chosen: Candidate | null; // first ready candidate
  unmet: boolean; // no provider advertises this capability at all
}

export interface RouterPolicy {
  tier_order: string[];
  free_first: boolean;
}

/**
 * CAPABILITY routing (not provider routing). Filters providers that advertise the
 * requested capability, gates each through AuthGate, then ranks: ready-first →
 * free-first tier order → higher quality. Returns the whole fallback chain.
 */
export function routeCapability(
  providers: ProviderConfig[],
  query: RouteQuery,
  gate: AuthGate,
  policy: RouterPolicy,
): RouteResult {
  const advertising = providers.filter((p) => p.capability_tags.includes(query.capability));

  const tierRank = (t: string) => {
    const i = policy.tier_order.indexOf(t);
    return i < 0 ? policy.tier_order.length : i;
  };

  const candidates: Candidate[] = advertising
    .map((p) => ({ provider: p.id, tier: p.tier, quality: p.quality, auth: gate.check(p) }))
    .sort((a, b) => {
      if (a.auth.ok !== b.auth.ok) return a.auth.ok ? -1 : 1; // ready first
      const t = tierRank(a.tier) - tierRank(b.tier); // free-first
      if (t !== 0) return t;
      return b.quality - a.quality; // higher quality
    });

  return {
    capability: query.capability,
    candidates,
    chosen: candidates.find((c) => c.auth.ok) ?? null,
    unmet: advertising.length === 0,
  };
}
