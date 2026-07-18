import type { ProviderConfig } from '../domain';
import type { EnvReader } from '../canon/env';

export type AuthState = 'ready' | 'needs_auth' | 'needs_credits' | 'unavailable';

export interface AuthStatus {
  provider: string;
  ok: boolean;
  state: AuthState;
  detail: string;
}

export interface AuthGateOpts {
  env: EnvReader;
  /** Live credit balances by provider id (from read-only probes). 0 => needs_credits; null/absent => unknown. */
  credits?: Record<string, number | null>;
}

/**
 * EXTENSION (M3) — the STOP mechanism. Before any generation the router consults the
 * AuthGate, which HALTS a provider with a structured reason instead of proceeding:
 * missing OAuth/session, missing API key, missing local path/host, or zero credits.
 * Secrets are checked by PRESENCE only (never read into the status).
 */
export class AuthGate {
  private readonly env: EnvReader;
  private readonly credits: Record<string, number | null>;

  constructor(opts: AuthGateOpts) {
    this.env = opts.env;
    this.credits = opts.credits ?? {};
  }

  check(p: ProviderConfig): AuthStatus {
    if (!p.enabled) return status(p, false, 'unavailable', 'disabled in providers.yaml');

    const missingEnv = p.requires_env.filter((n) => !this.env.has(n));
    const missingSecrets = p.auth.secrets.filter((n) => !this.env.has(n));

    if (p.auth.type === 'api_key') {
      if (missingSecrets.length) return status(p, false, 'needs_auth', `missing secret(s): ${missingSecrets.join(', ')}`);
      if (missingEnv.length) return status(p, false, 'needs_auth', `missing env: ${missingEnv.join(', ')}`);
      return this.creditsCheck(p);
    }

    if (p.auth.type === 'oauth' || p.auth.type === 'login' || p.auth.type === 'mcp_session') {
      if (!p.connected) return status(p, false, 'needs_auth', `${p.auth.type} not connected`);
      return this.creditsCheck(p);
    }

    // type === 'none' (local tools) — gated only by the path/host env vars.
    if (missingEnv.length) return status(p, false, 'needs_auth', `missing env: ${missingEnv.join(', ')}`);
    return this.creditsCheck(p);
  }

  private creditsCheck(p: ProviderConfig): AuthStatus {
    const c = this.credits[p.id];
    if (c === 0) return status(p, false, 'needs_credits', 'zero credits in workspace');
    if (c == null) return status(p, true, 'ready', 'ready (credits unknown)');
    return status(p, true, 'ready', `ready (${c} credits)`);
  }
}

function status(p: ProviderConfig, ok: boolean, state: AuthState, detail: string): AuthStatus {
  return { provider: p.id, ok, state, detail };
}
