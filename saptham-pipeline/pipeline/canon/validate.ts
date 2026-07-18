/** `npm run canon:load` — validate the L0 config bundle and print a summary (no generation). */
import { loadCanonBundle } from './loader';

const dir = process.argv[2] ?? 'vault/canon';

try {
  const { canon, providers, policy } = loadCanonBundle(dir);

  const enabled = providers.providers.filter((p) => p.enabled);
  const blocked = enabled.filter((p) => (p.auth.note ?? '').includes('BLOCKED'));
  const disabled = providers.providers.filter((p) => !p.enabled);

  console.log(
    `✓ canon.yaml    v${canon.version} — GSC ${canon.gsc.length} chars, ` +
      `${Object.keys(canon.tokens.swara_hues).length} swara hues, ` +
      `${Object.keys(canon.neg_presets).length} NEG presets, ` +
      `${canon.acceptance_test.length} acceptance gates`,
  );
  console.log(
    `✓ providers.yaml — ${providers.providers.length} providers ` +
      `(enabled: ${enabled.map((p) => p.id).join(', ') || 'none'}` +
      `${disabled.length ? `; staged/disabled: ${disabled.map((p) => p.id).join(', ')}` : ''})`,
  );
  console.log(
    `✓ policy.yaml    — free_first=${policy.free_first}, ` +
      `tiers [${policy.tier_order.join(' > ')}], ` +
      `retry ×${policy.retry.max_attempts}, ` +
      `acceptance-gated priorities [${policy.approval.require_acceptance_for.join(',')}]`,
  );
  if (blocked.length) {
    console.log(
      `⚠ credit/auth-blocked (AuthGate halts before generation): ${blocked
        .map((p) => p.id)
        .join(', ')}`,
    );
  }
  console.log('\nM0 canon bundle validated — contracts + config OK.');
} catch (e) {
  console.error((e as Error).message);
  process.exit(1);
}
