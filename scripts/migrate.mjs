#!/usr/bin/env node
/**
 * Applies the Saptham migrations ONE AT A TIME against the remote database and
 * verifies each step from the catalog — never by inference.
 *
 *   SUPABASE_DB_URL="postgresql://..." node scripts/migrate.mjs
 *   SUPABASE_DB_URL="postgresql://..." node scripts/migrate.mjs --verify-only
 *
 * Rules enforced here:
 *   • each file runs in its OWN transaction (a failure cannot roll back a
 *     previously-succeeded step)
 *   • on failure: print the VERBATIM PostgreSQL error — code, message, detail,
 *     hint, position, and the offending source line — then STOP immediately
 *   • after each step: query information_schema / pg_catalog and report counts
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const VERIFY_ONLY = process.argv.includes("--verify-only");

/** Load .env (Node does not do this automatically). Never overrides real env vars. */
function loadDotenv() {
  const file = resolve(root, ".env");
  if (!existsSync(file)) return;
  for (const raw of readFileSync(file, "utf8").split(/\r?\n/)) {
    const t = raw.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq < 0) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (process.env[k] === undefined) process.env[k] = v;
  }
}
loadDotenv();

/**
 * Connection string. Either supply SUPABASE_DB_URL whole, or just
 * SUPABASE_DB_PASSWORD and we assemble it — percent-encoding the password so
 * special characters (@ # / ? etc.) can never corrupt the URI.
 */
const DB_HOST = process.env.SUPABASE_DB_HOST || "aws-1-ap-south-1.pooler.supabase.com";
const DB_PORT = process.env.SUPABASE_DB_PORT || "5432";
const DB_USER = process.env.SUPABASE_DB_USER || "postgres.felgyueytcgrhjrnqakl";
const DB_NAME = process.env.SUPABASE_DB_NAME || "postgres";

let CONN = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL || "";
if (CONN && /\[YOUR-PASSWORD\]|<PASSWORD>|REPLACE_ME/i.test(CONN)) CONN = "";
if (!CONN && process.env.SUPABASE_DB_PASSWORD) {
  const pw = encodeURIComponent(process.env.SUPABASE_DB_PASSWORD);
  CONN = `postgresql://${DB_USER}:${pw}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

if (!CONN) {
  console.error(
    "\n✗ No database credential found.\n\n" +
      "  Add ONE of these to .env (already git-ignored):\n\n" +
      "    SUPABASE_DB_PASSWORD=your-database-password      ← simplest, we encode it\n" +
      "  or\n" +
      "    SUPABASE_DB_URL=postgresql://user:pass@host:5432/postgres\n\n" +
      "  Find/reset it: Dashboard → Project Settings → Database → Database password.\n",
  );
  process.exit(1);
}

const migrationsDir = resolve(root, "supabase/migrations");
const seedDir = resolve(root, "supabase/seed");

/** schema → RLS → seed → storage (storage last: most likely to lack privilege). */
const isStorage = (f) => /storage/i.test(f);
const mig = readdirSync(migrationsDir).filter((f) => f.endsWith(".sql")).sort();
const seeds = existsSync(seedDir) ? readdirSync(seedDir).filter((f) => f.endsWith(".sql")).sort() : [];

const STEPS = [
  ...mig.filter((f) => !isStorage(f)).map((f) => ({ label: f, path: join(migrationsDir, f) })),
  ...seeds.map((f) => ({ label: f, path: join(seedDir, f) })),
  ...mig.filter(isStorage).map((f) => ({ label: f, path: join(migrationsDir, f) })),
];

const client = new pg.Client({
  connectionString: CONN,
  ssl: { rejectUnauthorized: false },
  statement_timeout: 120_000,
});

const q = async (sql, params) => (await client.query(sql, params)).rows;
const line = (s = "─") => console.log(s.repeat(74));

/** Prints the PostgreSQL error verbatim — the source of truth. */
function reportPgError(err, sqlText, label) {
  console.log("");
  line("═");
  console.log(`✗ MIGRATION FAILED: ${label}`);
  line("═");
  console.log("EXACT PostgreSQL error:");
  console.log(`  message : ${err.message ?? "(none)"}`);
  console.log(`  code    : ${err.code ?? "(none)"}`);
  console.log(`  severity: ${err.severity ?? "(none)"}`);
  if (err.detail) console.log(`  detail  : ${err.detail}`);
  if (err.hint) console.log(`  hint    : ${err.hint}`);
  if (err.where) console.log(`  where   : ${err.where}`);
  if (err.schema) console.log(`  schema  : ${err.schema}`);
  if (err.table) console.log(`  table   : ${err.table}`);
  if (err.constraint) console.log(`  constraint: ${err.constraint}`);
  if (err.position) {
    const pos = Number(err.position);
    const upto = sqlText.slice(0, pos);
    const lineNo = upto.split("\n").length;
    const col = pos - upto.lastIndexOf("\n") - 1;
    console.log(`  position: char ${pos}  (line ${lineNo}, col ${col})`);
    const src = sqlText.split("\n");
    for (let i = Math.max(0, lineNo - 3); i < Math.min(src.length, lineNo + 2); i++) {
      console.log(`    ${String(i + 1).padStart(4)} ${i + 1 === lineNo ? "▶" : " "} ${src[i]}`);
    }
  }
  line("═");
  console.log("STOPPED. No further migrations were attempted.");
}

// ─── Verification (catalog queries only — never inference) ──────────────────
async function verifySchema() {
  const tables = await q(
    `select table_name from information_schema.tables
      where table_schema = 'public' and table_type = 'BASE TABLE'
      order by table_name`,
  );
  const pks = await q(
    `select tc.table_name, kcu.column_name
       from information_schema.table_constraints tc
       join information_schema.key_column_usage kcu
         on tc.constraint_name = kcu.constraint_name and tc.table_schema = kcu.table_schema
      where tc.table_schema = 'public' and tc.constraint_type = 'PRIMARY KEY'
      order by tc.table_name`,
  );
  const fks = await q(
    `select tc.table_name, kcu.column_name, ccu.table_name as ref_table
       from information_schema.table_constraints tc
       join information_schema.key_column_usage kcu
         on tc.constraint_name = kcu.constraint_name and tc.table_schema = kcu.table_schema
       join information_schema.constraint_column_usage ccu
         on ccu.constraint_name = tc.constraint_name
      where tc.table_schema = 'public' and tc.constraint_type = 'FOREIGN KEY'
      order by tc.table_name`,
  );
  const idx = await q(
    `select tablename, indexname from pg_indexes
      where schemaname = 'public' order by tablename, indexname`,
  );

  console.log(`\n  TABLES (${tables.length}):`);
  tables.forEach((t) => console.log(`    · ${t.table_name}`));
  console.log(`\n  PRIMARY KEYS (${pks.length}):`);
  pks.forEach((p) => console.log(`    · ${p.table_name}.${p.column_name}`));
  console.log(`\n  FOREIGN KEYS (${fks.length}):`);
  fks.length
    ? fks.forEach((f) => console.log(`    · ${f.table_name}.${f.column_name} → ${f.ref_table}`))
    : console.log("    (none — auth.* FKs were intentionally removed)");
  console.log(`\n  INDEXES (${idx.length}):`);
  idx.forEach((i) => console.log(`    · ${i.tablename}: ${i.indexname}`));
  return tables.length;
}

async function verifyRls() {
  const rls = await q(
    `select c.relname as table_name, c.relrowsecurity as rls_enabled
       from pg_class c join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public' and c.relkind = 'r'
      order by c.relname`,
  );
  const pol = await q(
    `select tablename, policyname, cmd from pg_policies
      where schemaname = 'public' order by tablename, policyname`,
  );
  const off = rls.filter((r) => !r.rls_enabled);

  console.log(`\n  RLS ENABLED: ${rls.filter((r) => r.rls_enabled).length}/${rls.length} tables`);
  rls.forEach((r) => console.log(`    ${r.rls_enabled ? "✓" : "✗"} ${r.table_name}`));
  console.log(`\n  POLICIES (${pol.length}):`);
  pol.forEach((p) => console.log(`    · ${p.tablename}: ${p.policyname} [${p.cmd}]`));
  if (off.length) console.log(`\n  ⚠ RLS OFF on: ${off.map((o) => o.table_name).join(", ")}`);
  return { tables: rls.length, withRls: rls.length - off.length, policies: pol.length };
}

async function verifyRows() {
  const tables = await q(
    `select table_name from information_schema.tables
      where table_schema='public' and table_type='BASE TABLE' order by table_name`,
  );
  console.log("\n  ROW COUNTS:");
  const counts = {};
  for (const { table_name } of tables) {
    const [{ n }] = await q(`select count(*)::int as n from public.${table_name}`);
    counts[table_name] = n;
    console.log(`    · ${table_name.padEnd(20)} ${n}`);
  }
  return counts;
}

async function verifyBuckets() {
  try {
    const b = await q(`select id, public, file_size_limit from storage.buckets order by id`);
    console.log(`\n  STORAGE BUCKETS (${b.length}):`);
    b.forEach((x) => console.log(`    · ${x.id.padEnd(16)} public=${x.public}  limit=${x.file_size_limit}`));
    const pol = await q(`select policyname from pg_policies where schemaname='storage' and tablename='objects'`);
    console.log(`  storage.objects policies: ${pol.length}`);
    return b.length;
  } catch (e) {
    console.log(`\n  (could not read storage.buckets: ${e.message})`);
    return 0;
  }
}

async function verifyFor(label) {
  if (/schema/i.test(label)) return void (await verifySchema());
  if (/rls/i.test(label)) return void (await verifyRls());
  if (/seed/i.test(label)) return void (await verifyRows());
  if (/storage/i.test(label)) return void (await verifyBuckets());
}

// ─── Run ────────────────────────────────────────────────────────────────────
try {
  await client.connect();
  const [{ v }] = await q("select version() as v");
  console.log(`\nConnected. ${v.split(",")[0]}`);

  if (VERIFY_ONLY) {
    line("═");
    console.log("VERIFY ONLY — no migrations applied");
    line("═");
    await verifySchema();
    await verifyRls();
    await verifyRows();
    await verifyBuckets();
    await client.end();
    process.exit(0);
  }

  for (const [i, step] of STEPS.entries()) {
    const sqlText = readFileSync(step.path, "utf8");
    line("═");
    console.log(`STEP ${i + 1}/${STEPS.length} — ${step.label}`);
    line("═");

    try {
      await client.query("begin");
      await client.query(sqlText);
      await client.query("commit");
      console.log(`✓ applied: ${step.label}`);
    } catch (err) {
      try {
        await client.query("rollback");
      } catch {
        /* connection may already be aborted */
      }
      reportPgError(err, sqlText, step.label);
      await client.end();
      process.exit(1);
    }

    await verifyFor(step.label);
    console.log("");
  }

  line("═");
  console.log("ALL MIGRATIONS APPLIED — final verification");
  line("═");
  await verifySchema();
  await verifyRls();
  await verifyRows();
  await verifyBuckets();
  console.log("\n✓ Done.\n");
  await client.end();
} catch (err) {
  console.error("\n✗ Connection/runtime error:");
  console.error(`  message: ${err.message}`);
  if (err.code) console.error(`  code   : ${err.code}`);
  console.error(
    "\n  If this is a DNS/auth error, re-copy the string from Dashboard → Connect.\n" +
      "  Prefer the Session pooler string if your network is IPv4-only.\n",
  );
  try {
    await client.end();
  } catch {
    /* already closed */
  }
  process.exit(1);
}
