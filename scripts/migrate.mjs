#!/usr/bin/env node
/**
 * Applies the Saptham migrations ONE AT A TIME against the remote database and
 * verifies each step from the catalog — never by inference.
 *
 *   node scripts/migrate.mjs --apply
 *   node scripts/migrate.mjs --apply --seed
 *   node scripts/migrate.mjs --verify-only
 *
 * Rules enforced here:
 *   • each file runs in its OWN transaction (a failure cannot roll back a
 *     previously-succeeded step)
 *   • on failure: print safe PostgreSQL diagnostics and position, then STOP
 *     immediately (SQL and row-bearing detail/where fields are not echoed)
 *   • remote TLS is verified with the operator-supplied Supabase CA certificate
 *   • an advisory lock prevents two migration runs from overlapping
 *   • after each step: query information_schema / pg_catalog and report counts
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, resolve, join, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SUPPORTED_ARGS = new Set(["--verify-only", "--apply", "--seed"]);
const unknownArgs = process.argv.slice(2).filter((arg) => !SUPPORTED_ARGS.has(arg));
if (unknownArgs.length) {
  console.error(`\n✗ Unknown argument(s): ${unknownArgs.join(", ")}\n`);
  process.exit(1);
}
const VERIFY_ONLY = process.argv.includes("--verify-only");
const APPLY = process.argv.includes("--apply");
const INCLUDE_SEED = process.argv.includes("--seed");

if (VERIFY_ONLY === APPLY || (INCLUDE_SEED && !APPLY)) {
  console.error(
    "\n✗ Choose exactly one mode:\n\n" +
      "    --verify-only          read-only catalog/security checks\n" +
      "    --apply                apply migrations (seed excluded)\n" +
      "    --apply --seed         apply migrations and explicitly upsert seed data\n",
  );
  process.exit(1);
}

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
 * Connection string. Supply SUPABASE_DB_URL or every explicit connection
 * component. No project/host defaults and no generic DATABASE_URL fallback are
 * accepted: an operator must deliberately target a Supabase database.
 */
const DB_HOST = process.env.SUPABASE_DB_HOST || "";
const DB_PORT = process.env.SUPABASE_DB_PORT || "5432";
const DB_USER = process.env.SUPABASE_DB_USER || "";
const DB_NAME = process.env.SUPABASE_DB_NAME || "postgres";

let CONN = process.env.SUPABASE_DB_URL || "";
if (CONN && /\[YOUR-PASSWORD\]|<PASSWORD>|REPLACE_ME/i.test(CONN)) CONN = "";
if (!CONN && DB_HOST && DB_USER && process.env.SUPABASE_DB_PASSWORD) {
  const pw = encodeURIComponent(process.env.SUPABASE_DB_PASSWORD);
  CONN = `postgresql://${DB_USER}:${pw}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

if (!CONN) {
  console.error(
    "\n✗ No explicit Supabase database target found.\n\n" +
      "  Set SUPABASE_DB_URL, or set SUPABASE_DB_HOST, SUPABASE_DB_USER,\n" +
      "  SUPABASE_DB_PASSWORD, and optionally SUPABASE_DB_PORT/NAME in .env.\n",
  );
  process.exit(1);
}

let connectionUrl;
try {
  connectionUrl = new URL(CONN);
  if (!["postgres:", "postgresql:"].includes(connectionUrl.protocol)) {
    throw new Error("not PostgreSQL");
  }
  for (const key of ["sslmode", "sslrootcert", "sslcert", "sslkey"]) {
    connectionUrl.searchParams.delete(key);
  }
  CONN = connectionUrl.toString();
} catch {
  console.error("\n✗ SUPABASE_DB_URL is not a valid PostgreSQL connection URL.\n");
  process.exit(1);
}

const CA_INPUT = process.env.SUPABASE_DB_CA_CERT || "";
const CA_PATH = CA_INPUT ? (isAbsolute(CA_INPUT) ? CA_INPUT : resolve(root, CA_INPUT)) : "";
if (!CA_PATH || !existsSync(CA_PATH)) {
  console.error(
    "\n✗ A readable SUPABASE_DB_CA_CERT file is required for verified TLS.\n\n" +
      "  Download the project's database CA certificate from Supabase, save it\n" +
      "  outside source control, and set SUPABASE_DB_CA_CERT to that PEM path.\n",
  );
  process.exit(1);
}
const DB_CA = readFileSync(CA_PATH, "utf8");

const migrationsDir = resolve(root, "supabase/migrations");
const seedDir = resolve(root, "supabase/seed");

/** schema → RLS → seed → storage (storage last: most likely to lack privilege). */
const STORAGE_MIGRATION = "20260718090003_storage.sql";
const isStorage = (f) => f === STORAGE_MIGRATION;
const mig = readdirSync(migrationsDir).filter((f) => f.endsWith(".sql")).sort();
const seeds = existsSync(seedDir) ? readdirSync(seedDir).filter((f) => f.endsWith(".sql")).sort() : [];

const STEPS = [
  ...mig.filter((f) => !isStorage(f)).map((f) => ({ label: f, path: join(migrationsDir, f) })),
  ...(INCLUDE_SEED ? seeds.map((f) => ({ label: f, path: join(seedDir, f) })) : []),
  ...mig.filter(isStorage).map((f) => ({ label: f, path: join(migrationsDir, f) })),
];

const client = new pg.Client({
  connectionString: CONN,
  ssl: { ca: DB_CA, rejectUnauthorized: true },
  statement_timeout: 120_000,
});

const q = async (sql, params) => (await client.query(sql, params)).rows;
const line = (s = "─") => console.log(s.repeat(74));
const EXPECTED_TABLES = [
  "admin_users",
  "office_bearers",
  "alumni",
  "events",
  "event_gallery",
  "performances",
  "achievements",
  "announcements",
  "sponsors",
  "contact_messages",
  "media_assets",
  "settings",
  "calendar_events",
];
const ANON_READ_TABLES = new Set([
  "office_bearers",
  "alumni",
  "events",
  "event_gallery",
  "performances",
  "achievements",
  "announcements",
  "sponsors",
  "media_assets",
  "settings",
  "calendar_events",
]);
const CONTACT_INSERT_COLUMNS = ["name", "email", "subject", "message", "source"];
const REQUIRED_POLICIES = [
  ["office_bearers", "public_read_published", "SELECT", ["anon", "authenticated"]],
  ["office_bearers", "admin_all", "ALL", ["authenticated"]],
  ["alumni", "public_read_published", "SELECT", ["anon", "authenticated"]],
  ["alumni", "admin_all", "ALL", ["authenticated"]],
  ["events", "public_read_published", "SELECT", ["anon", "authenticated"]],
  ["events", "admin_all", "ALL", ["authenticated"]],
  ["event_gallery", "public_read_published", "SELECT", ["anon", "authenticated"]],
  ["event_gallery", "admin_all", "ALL", ["authenticated"]],
  ["performances", "public_read_published", "SELECT", ["anon", "authenticated"]],
  ["performances", "admin_all", "ALL", ["authenticated"]],
  ["achievements", "public_read_published", "SELECT", ["anon", "authenticated"]],
  ["achievements", "admin_all", "ALL", ["authenticated"]],
  ["sponsors", "public_read_published", "SELECT", ["anon", "authenticated"]],
  ["sponsors", "admin_all", "ALL", ["authenticated"]],
  ["announcements", "public_read_active", "SELECT", ["anon", "authenticated"]],
  ["announcements", "admin_all", "ALL", ["authenticated"]],
  ["contact_messages", "anyone_can_submit", "INSERT", ["anon"]],
  ["contact_messages", "admin_insert_messages", "INSERT", ["authenticated"]],
  ["contact_messages", "admin_read_messages", "SELECT", ["authenticated"]],
  ["contact_messages", "admin_update_messages", "UPDATE", ["authenticated"]],
  ["contact_messages", "admin_delete_messages", "DELETE", ["authenticated"]],
  ["media_assets", "public_read_media", "SELECT", ["anon", "authenticated"]],
  ["media_assets", "admin_all", "ALL", ["authenticated"]],
  ["settings", "public_read_public_settings", "SELECT", ["anon", "authenticated"]],
  ["settings", "admin_all", "ALL", ["authenticated"]],
  ["admin_users", "read_own_admin_row", "SELECT", ["authenticated"]],
  ["admin_users", "admin_manage_admins", "ALL", ["authenticated"]],
  ["calendar_events", "public_read_published", "SELECT", ["anon", "authenticated"]],
  ["calendar_events", "admin_all", "ALL", ["authenticated"]],
];
const EXPECTED_BUCKETS = new Map([
  ["office-bearers", { limit: 10_485_760, mime: ["image/jpeg", "image/png", "image/webp", "image/avif"] }],
  ["alumni", { limit: 10_485_760, mime: ["image/jpeg", "image/png", "image/webp", "image/avif"] }],
  ["events", { limit: 15_728_640, mime: ["image/jpeg", "image/png", "image/webp", "image/avif"] }],
  ["gallery", { limit: 15_728_640, mime: ["image/jpeg", "image/png", "image/webp", "image/avif"] }],
  ["hero", { limit: 52_428_800, mime: ["image/jpeg", "image/png", "image/webp", "image/avif", "video/mp4", "video/webm"] }],
  ["assets", { limit: 52_428_800, mime: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml", "video/mp4", "video/webm", "audio/mpeg", "audio/webm"] }],
  ["logos", { limit: 5_242_880, mime: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"] }],
]);
const quoteIdent = (value) => `"${String(value).replaceAll('"', '""')}"`;

/** Prints diagnostic metadata without echoing SQL or potentially sensitive row values. */
function reportPgError(err, sqlText, label) {
  console.log("");
  line("═");
  console.log(`✗ MIGRATION FAILED: ${label}`);
  line("═");
  console.log("PostgreSQL error:");
  console.log(`  message : ${err.message ?? "(none)"}`);
  console.log(`  code    : ${err.code ?? "(none)"}`);
  console.log(`  severity: ${err.severity ?? "(none)"}`);
  if (err.detail || err.where) {
    console.log("  detail  : omitted (server detail/where may contain row values)");
  }
  if (err.hint) console.log(`  hint    : ${err.hint}`);
  if (err.schema) console.log(`  schema  : ${err.schema}`);
  if (err.table) console.log(`  table   : ${err.table}`);
  if (err.constraint) console.log(`  constraint: ${err.constraint}`);
  if (err.position) {
    const pos = Number(err.position);
    const upto = sqlText.slice(0, pos);
    const lineNo = upto.split("\n").length;
    const col = pos - upto.lastIndexOf("\n") - 1;
    console.log(`  position: char ${pos}  (line ${lineNo}, col ${col})`);
  }
  line("═");
  console.log("STOPPED. No further migrations were attempted.");
}

// ─── Verification (catalog queries only — never inference) ──────────────────
async function verifySchema(strict = false) {
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
  const found = new Set(tables.map((t) => t.table_name));
  const missing = EXPECTED_TABLES.filter((name) => !found.has(name));
  if (strict && missing.length) {
    throw new Error(`required public tables are missing: ${missing.join(", ")}`);
  }
  return tables.length;
}

async function verifyRls(strict = false) {
  const rls = await q(
    `select c.relname as table_name, c.relrowsecurity as rls_enabled
       from pg_class c join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public' and c.relkind = 'r'
      order by c.relname`,
  );
  const pol = await q(
    `select tablename, policyname, cmd, roles::text[] as roles, qual, with_check from pg_policies
      where schemaname = 'public' order by tablename, policyname`,
  );
  const off = rls.filter((r) => !r.rls_enabled);

  console.log(`\n  RLS ENABLED: ${rls.filter((r) => r.rls_enabled).length}/${rls.length} tables`);
  rls.forEach((r) => console.log(`    ${r.rls_enabled ? "✓" : "✗"} ${r.table_name}`));
  console.log(`\n  POLICIES (${pol.length}):`);
  pol.forEach((p) => console.log(`    · ${p.tablename}: ${p.policyname} [${p.cmd}]`));
  if (off.length) console.log(`\n  ⚠ RLS OFF on: ${off.map((o) => o.table_name).join(", ")}`);
  if (strict) {
    const byTable = new Map(rls.map((row) => [row.table_name, row.rls_enabled]));
    const missing = EXPECTED_TABLES.filter((name) => !byTable.has(name));
    const unprotected = rls.filter((row) => !row.rls_enabled).map((row) => row.table_name);
    const policiesByKey = new Map(pol.map((row) => [`${row.tablename}.${row.policyname}`, row]));
    const requiredPolicyKeys = new Set(
      REQUIRED_POLICIES.map(([table, name]) => `${table}.${name}`),
    );
    const badPolicies = [];
    const unexpectedPolicies = pol
      .filter((row) => !requiredPolicyKeys.has(`${row.tablename}.${row.policyname}`))
      .map((row) => `${row.tablename}.${row.policyname}`);
    for (const [table, name, command, roles] of REQUIRED_POLICIES) {
      const policy = policiesByKey.get(`${table}.${name}`);
      const actualRoles = policy?.roles ? [...policy.roles].sort() : [];
      if (
        !policy ||
        policy.cmd !== command ||
        actualRoles.join(",") !== [...roles].sort().join(",")
      ) {
        badPolicies.push(`${table}.${name}`);
      }
      if (
        policy &&
        name.startsWith("admin_") &&
        !`${policy.qual ?? ""} ${policy.with_check ?? ""}`.includes("is_admin")
      ) {
        badPolicies.push(`${table}.${name}(predicate)`);
      }
    }
    const contactSubmit = policiesByKey.get("contact_messages.anyone_can_submit");
    if (
      !contactSubmit?.with_check?.includes("source") ||
      !contactSubmit.with_check.includes("char_length") ||
      !contactSubmit.with_check.includes("admin_notes")
    ) {
      badPolicies.push("contact_messages.anyone_can_submit(check)");
    }
    for (const table of [
      "office_bearers",
      "alumni",
      "events",
      "event_gallery",
      "performances",
      "achievements",
      "sponsors",
      "calendar_events",
    ]) {
      if (!policiesByKey.get(`${table}.public_read_published`)?.qual?.includes("is_published")) {
        badPolicies.push(`${table}.public_read_published(predicate)`);
      }
    }
    if (missing.length || unprotected.length || badPolicies.length || unexpectedPolicies.length) {
      throw new Error(
        [
          missing.length ? `missing RLS tables: ${missing.join(", ")}` : "",
          unprotected.length ? `RLS disabled: ${unprotected.join(", ")}` : "",
          badPolicies.length ? `missing/mismatched policies: ${badPolicies.join(", ")}` : "",
          unexpectedPolicies.length
            ? `unexpected public policies require review: ${unexpectedPolicies.join(", ")}`
            : "",
        ]
          .filter(Boolean)
          .join("; "),
      );
    }
  }
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
    const [{ n }] = await q(`select count(*)::int as n from public.${quoteIdent(table_name)}`);
    counts[table_name] = n;
    console.log(`    · ${table_name.padEnd(20)} ${n}`);
  }
  return counts;
}

async function verifyPrivileges() {
  const failures = [];
  for (const table of EXPECTED_TABLES) {
    const relation = `public.${table}`;
    const [privileges] = await q(
      `select
         has_table_privilege('anon', $1, 'SELECT') as anon_select,
         has_table_privilege('anon', $1, 'INSERT') as anon_insert,
         has_table_privilege('anon', $1, 'UPDATE') as anon_update,
         has_table_privilege('anon', $1, 'DELETE') as anon_delete,
         has_table_privilege('authenticated', $1, 'SELECT') as auth_select,
         has_table_privilege('authenticated', $1, 'INSERT') as auth_insert,
         has_table_privilege('authenticated', $1, 'UPDATE') as auth_update,
         has_table_privilege('authenticated', $1, 'DELETE') as auth_delete,
         (
           has_table_privilege('anon', $1, 'TRUNCATE')
           or has_table_privilege('anon', $1, 'TRIGGER')
           or has_table_privilege('anon', $1, 'REFERENCES')
         ) as anon_dangerous,
         (
           has_table_privilege('authenticated', $1, 'TRUNCATE')
           or has_table_privilege('authenticated', $1, 'TRIGGER')
           or has_table_privilege('authenticated', $1, 'REFERENCES')
         ) as auth_dangerous`,
      [relation],
    );

    if (privileges.anon_dangerous || privileges.auth_dangerous) {
      failures.push(`${table}: dangerous table privilege`);
    }
    if (privileges.anon_update || privileges.anon_delete || privileges.anon_insert) {
      failures.push(`${table}: anonymous table-level write privilege`);
    }
    if (privileges.anon_select !== ANON_READ_TABLES.has(table)) {
      failures.push(`${table}: anonymous SELECT matrix mismatch`);
    }
    if (
      !privileges.auth_select ||
      !privileges.auth_insert ||
      !privileges.auth_update ||
      !privileges.auth_delete
    ) {
      failures.push(`${table}: authenticated CRUD grant missing`);
    }
  }

  const contactColumns = await q(
    `select column_name
       from information_schema.column_privileges
      where table_schema = 'public'
        and table_name = 'contact_messages'
        and grantee = 'anon'
        and privilege_type = 'INSERT'
      order by column_name`,
  );
  const actualContactColumns = contactColumns.map((row) => row.column_name).sort();
  if (actualContactColumns.join(",") !== [...CONTACT_INSERT_COLUMNS].sort().join(",")) {
    failures.push(`contact_messages: anon INSERT columns are [${actualContactColumns.join(", ")}]`);
  }

  const [{
    schema_anon,
    schema_authenticated,
    schema_create_anon,
    schema_create_authenticated,
    is_admin_anon,
    is_admin_authenticated,
    trigger_anon,
    trigger_authenticated,
  }] = await q(
    `select
       has_schema_privilege('anon', 'public', 'USAGE') as schema_anon,
       has_schema_privilege('authenticated', 'public', 'USAGE') as schema_authenticated,
       has_schema_privilege('anon', 'public', 'CREATE') as schema_create_anon,
       has_schema_privilege('authenticated', 'public', 'CREATE') as schema_create_authenticated,
       has_function_privilege('anon', 'public.is_admin()', 'EXECUTE') as is_admin_anon,
       has_function_privilege('authenticated', 'public.is_admin()', 'EXECUTE') as is_admin_authenticated,
       has_function_privilege('anon', 'public.set_updated_at()', 'EXECUTE') as trigger_anon,
       has_function_privilege('authenticated', 'public.set_updated_at()', 'EXECUTE') as trigger_authenticated`,
  );
  if (!schema_anon || !schema_authenticated) failures.push("public schema: missing API usage grant");
  if (schema_create_anon || schema_create_authenticated) {
    failures.push("public schema: API role can create objects");
  }
  if (!is_admin_anon || !is_admin_authenticated) failures.push("is_admin(): missing API execute grant");
  if (trigger_anon || trigger_authenticated) failures.push("set_updated_at(): API-executable");

  const unsafeDefaults = await q(
    `select
       pg_get_userbyid(d.defaclrole) as owner,
       d.defaclobjtype as object_type,
       case when x.grantee = 0 then 'PUBLIC' else pg_get_userbyid(x.grantee) end as grantee,
       x.privilege_type
     from pg_default_acl d
     left join pg_namespace n on n.oid = d.defaclnamespace
     cross join lateral aclexplode(d.defaclacl) x
     where (d.defaclnamespace = 0 or n.nspname = 'public')
       and (
         pg_get_userbyid(x.grantee) in ('anon', 'authenticated')
          or (
            x.grantee = 0
            and d.defaclobjtype in ('r', 'S', 'f')
            and x.privilege_type in ('SELECT', 'INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'REFERENCES', 'TRIGGER', 'USAGE', 'EXECUTE')
          )
        )`,
  );
  if (unsafeDefaults.length) {
    failures.push(
      `unsafe default ACLs: ${unsafeDefaults
        .map((row) => `${row.owner}/${row.object_type}/${row.grantee}/${row.privilege_type}`)
        .join(", ")}`,
    );
  }

  const functionOwners = await q(
    `select distinct pg_get_userbyid(p.proowner) as owner
       from pg_proc p
       join pg_namespace n on n.oid = p.pronamespace
      where n.nspname = 'public'
        and p.proname in ('is_admin', 'set_updated_at')`,
  );
  const safeFunctionDefaultOwners = await q(
    `select pg_get_userbyid(d.defaclrole) as owner
     from pg_default_acl d
      where d.defaclnamespace = 0
        and d.defaclobjtype = 'f'
        and not exists (
          select 1
            from aclexplode(d.defaclacl) x
           where x.grantee = 0 and x.privilege_type = 'EXECUTE'
        )`,
  );
  const safeOwnerNames = new Set(safeFunctionDefaultOwners.map((row) => row.owner));
  const missingFunctionDefaults = functionOwners
    .map((row) => row.owner)
    .filter((owner) => !safeOwnerNames.has(owner));
  if (missingFunctionDefaults.length) {
    failures.push(
      `function owners lack a deny-PUBLIC default ACL: ${missingFunctionDefaults.join(", ")}`,
    );
  }

  console.log("\n  API PRIVILEGES:");
  console.log(failures.length ? `    ✗ ${failures.join("; ")}` : "    ✓ explicit least-privilege checks passed");
  if (failures.length) throw new Error(`API privilege verification failed: ${failures.join("; ")}`);
}

async function verifyBuckets(strict = false) {
  try {
    const b = await q(
      `select id, public, file_size_limit, allowed_mime_types
         from storage.buckets order by id`,
    );
    console.log(`\n  STORAGE BUCKETS (${b.length}):`);
    b.forEach((x) => console.log(`    · ${x.id.padEnd(16)} public=${x.public}  limit=${x.file_size_limit}`));
    const pol = await q(
      `select policyname, cmd, roles::text[] as roles, qual, with_check
         from pg_policies
        where schemaname = 'storage' and tablename = 'objects'`,
    );
    console.log(`  storage.objects policies: ${pol.length}`);

    if (strict) {
      const failures = [];
      const bucketsById = new Map(b.map((row) => [row.id, row]));
      const policiesByName = new Map(pol.map((row) => [row.policyname, row]));
      const expectedPolicyNames = new Set();
      for (const [id, expected] of EXPECTED_BUCKETS) {
        const bucket = bucketsById.get(id);
        const actualMime = bucket?.allowed_mime_types ? [...bucket.allowed_mime_types].sort() : [];
        if (
          !bucket ||
          bucket.public !== true ||
          Number(bucket.file_size_limit) !== expected.limit ||
          actualMime.join(",") !== [...expected.mime].sort().join(",")
        ) {
          failures.push(`${id}: bucket configuration`);
        }

        const suffix = id.replaceAll("-", "_");
        expectedPolicyNames.add(`public_read_${suffix}`);
        expectedPolicyNames.add(`admin_write_${suffix}`);
        const read = policiesByName.get(`public_read_${suffix}`);
        const write = policiesByName.get(`admin_write_${suffix}`);
        if (
          !read ||
          read.cmd !== "SELECT" ||
          [...(read.roles ?? [])].sort().join(",") !== "anon,authenticated" ||
          !read.qual?.includes(`'${id}'`)
        ) {
          failures.push(`${id}: public-read policy`);
        }
        if (
          !write ||
          write.cmd !== "ALL" ||
          [...(write.roles ?? [])].join(",") !== "authenticated" ||
          !write.qual?.includes(`'${id}'`) ||
          !write.qual.includes("is_admin") ||
          !write.with_check?.includes(`'${id}'`) ||
          !write.with_check.includes("is_admin")
        ) {
          failures.push(`${id}: admin-write policy`);
        }
      }
      const unexpectedBuckets = b
        .map((row) => row.id)
        .filter((id) => !EXPECTED_BUCKETS.has(id));
      const unexpectedPolicies = pol
        .map((row) => row.policyname)
        .filter((name) => !expectedPolicyNames.has(name));
      if (unexpectedBuckets.length) {
        failures.push(`unexpected buckets require review: ${unexpectedBuckets.join(", ")}`);
      }
      if (unexpectedPolicies.length) {
        failures.push(`unexpected storage policies require review: ${unexpectedPolicies.join(", ")}`);
      }
      if (failures.length) {
        throw new Error(`storage verification failed: ${failures.join(", ")}`);
      }
    }
    return b.length;
  } catch (e) {
    if (strict) throw e;
    console.log(`\n  (could not verify storage: ${e.message})`);
    return 0;
  }
}

async function verifyFor(label) {
  if (/schema/i.test(label)) return void (await verifySchema());
  if (/rls/i.test(label)) return void (await verifyRls());
  if (/hardening|least_privilege/i.test(label)) return void (await verifyPrivileges());
  if (/seed/i.test(label)) return void (await verifyRows());
  if (/storage/i.test(label)) return void (await verifyBuckets(true));
}

// ─── Run ────────────────────────────────────────────────────────────────────
try {
  await client.connect();
  const [{ v }] = await q("select version() as v");
  console.log(`\nConnected. ${v.split(",")[0]}`);
  console.log(
    `Target: ${connectionUrl.hostname}:${connectionUrl.port || "5432"}${connectionUrl.pathname} ` +
      `as ${decodeURIComponent(connectionUrl.username)}`,
  );

  if (VERIFY_ONLY) {
    line("═");
    console.log("VERIFY ONLY — no migrations applied");
    line("═");
    await verifySchema(true);
    await verifyRls(true);
    await verifyPrivileges();
    await verifyRows();
    await verifyBuckets(true);
    await client.end();
    process.exit(0);
  }

  await q("select pg_advisory_lock(hashtext('saptham-website-migrations'))");

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
  await verifySchema(true);
  await verifyRls(true);
  await verifyPrivileges();
  await verifyRows();
  await verifyBuckets(true);
  await q("select pg_advisory_unlock(hashtext('saptham-website-migrations'))");
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
