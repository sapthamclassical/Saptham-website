import { readFileSync } from 'node:fs';

/** Read a UTF-8 markdown doc. */
export function readDoc(path: string): string {
  return readFileSync(path, 'utf8');
}

export function uniq<T>(xs: T[]): T[] {
  return [...new Set(xs)];
}

/** First capture group (or whole match) of a regex against a string, else null. */
export function pick(s: string, re: RegExp): string | null {
  const m = s.match(re);
  if (!m) return null;
  return m[1] ?? m[0];
}

export interface MdSection {
  heading: string;
  body: string;
}

/** Split a markdown doc into sections by ATX headings of exactly `level` (default `# `). */
export function splitSections(md: string, level = 1): MdSection[] {
  const prefix = '#'.repeat(level) + ' ';
  const deeper = '#'.repeat(level + 1);
  const out: MdSection[] = [];
  let cur: MdSection | null = null;
  for (const line of md.split(/\r?\n/)) {
    if (line.startsWith(prefix) && !line.startsWith(deeper)) {
      if (cur) out.push(cur);
      cur = { heading: line.slice(prefix.length).trim(), body: '' };
    } else if (cur) {
      cur.body += line + '\n';
    }
  }
  if (cur) out.push(cur);
  return out;
}

export interface MdTable {
  headers: string[];
  rows: Record<string, string>[];
}

/** Parse the first GitHub-style pipe table in a block. */
export function parseTable(md: string): MdTable | null {
  const lines = md.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.startsWith('|'));
  if (lines.length < 2) return null;
  const cells = (l: string) =>
    l.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
  const headers = cells(lines[0]!);
  const rows: Record<string, string>[] = [];
  for (let i = 2; i < lines.length; i++) {
    const c = cells(lines[i]!);
    if (c.every((x) => /^:?-+:?$/.test(x))) continue;
    const row: Record<string, string> = {};
    headers.forEach((h, j) => {
      row[h] = c[j] ?? '';
    });
    rows.push(row);
  }
  return { headers, rows };
}

/**
 * Expand a comma/semicolon asset list into canonical IDs, handling the doc's shorthands:
 *  - prefix carry:  "BRD-01,02,03"      -> BRD-01, BRD-02, BRD-03
 *  - ranges:        "TEX-01..10"        -> TEX-01 … TEX-10
 *  - slash pairs:   "HERO-01/02"        -> HERO-01, HERO-02
 *  - parentheticals "(silk field)"      -> ignored
 */
export function expandAssetList(line: string): string[] {
  const out: string[] = [];
  let prefix = '';
  for (let tok of line.split(/[;,]/)) {
    tok = tok.replace(/\([^)]*\)/g, '').trim();
    if (!tok) continue;

    const range = tok.match(/^([A-Z][A-Z0-9]{0,4})-(\d+)\.\.(\d+)/);
    if (range) {
      prefix = range[1]!;
      const w = range[2]!.length;
      for (let n = Number(range[2]); n <= Number(range[3]); n++) {
        out.push(`${prefix}-${String(n).padStart(w, '0')}`);
      }
      continue;
    }

    const full = tok.match(/^([A-Z][A-Z0-9]{0,4})-(\d+)/);
    if (full) {
      prefix = full[1]!;
      const w = full[2]!.length;
      out.push(`${prefix}-${full[2]!}`);
      for (const s of tok.matchAll(/\/(\d+)/g)) out.push(`${prefix}-${s[1]!.padStart(w, '0')}`);
      continue;
    }

    const cont = tok.match(/^(\d+)$/);
    if (cont && prefix) {
      out.push(`${prefix}-${cont[1]!.padStart(2, '0')}`);
      continue;
    }
  }
  return uniq(out);
}

/** Loose ID extraction from prose (no prefix-carry) — used for scene requirement lines. */
export function extractIds(text: string): string[] {
  const out: string[] = [];
  for (const m of text.matchAll(/\b([A-Z][A-Z0-9]{0,4})-(\d+(?:\/\d+)*)/g)) {
    const prefix = m[1]!;
    const nums = m[2]!.split('/');
    const w = nums[0]!.length;
    for (const n of nums) out.push(`${prefix}-${n.padStart(w, '0')}`);
  }
  return uniq(out);
}
