import { describe, it, expect } from 'vitest';
import {
  readDoc, ingestAssets, ingestBatches, ingestScenes, joinRegistry, expandAssetList,
} from '../pipeline/registry';

const DOCS = '../docs';
const inventory = readDoc(`${DOCS}/MASTER_ASSET_INVENTORY.md`);
const roadmap = readDoc(`${DOCS}/ASSET_PRODUCTION_ROADMAP.md`);
const storyboard = readDoc(`${DOCS}/STORYBOARD.md`);

describe('M1 · shorthand expansion', () => {
  it('expands prefix-carry, ranges, and slash pairs', () => {
    expect(expandAssetList('BRD-01,02,03')).toEqual(['BRD-01', 'BRD-02', 'BRD-03']);
    expect(expandAssetList('TEX-01..03')).toEqual(['TEX-01', 'TEX-02', 'TEX-03']);
    expect(expandAssetList('HERO-01/02, HERO-03 (silk)')).toEqual(['HERO-01', 'HERO-02', 'HERO-03']);
  });
});

describe('M1 · asset ingestion', () => {
  const { assets, skipped } = ingestAssets(inventory);
  it('ingests the full inventory with no skipped rows', () => {
    expect(assets.length).toBeGreaterThan(150);
    expect(skipped).toHaveLength(0);
  });
  it('parses a Family-B lit object correctly', () => {
    const lamp = assets.find((a) => a.id === 'LGT-01');
    expect(lamp?.category).toBe('lgt');
    expect(lamp?.priority).toBe('C');
    expect(lamp?.modality).toBe('image');
  });
  it('captures dedupe derivations', () => {
    expect(assets.find((a) => a.id === 'DIV-01')?.derives_from).toBe('KOL-02');
  });
});

describe('M1 · batch + scene ingestion and join', () => {
  const assets = ingestAssets(inventory).assets;
  const batches = ingestBatches(roadmap);
  const scenes = ingestScenes(storyboard);
  const reg = joinRegistry(assets, batches, scenes);

  it('parses 15 scenes with swara accents', () => {
    expect(scenes).toHaveLength(15);
    expect(scenes.find((s) => s.id === '06')?.swara).toBe('Pa');
  });

  it('parses the 15-batch roadmap', () => {
    expect(batches.length).toBeGreaterThanOrEqual(15);
    expect(batches.find((b) => b.order === 7)?.family).toBe('B');
  });

  it('joins LGT-01 to a lit-objects batch and gives it family B', () => {
    const lamp = reg.assets.find((a) => a.id === 'LGT-01');
    expect(lamp?.batch).toContain('b07');
    expect(lamp?.family).toBe('B');
  });

  it('flags CANON-added assets that are referenced but not registered', () => {
    expect(reg.gaps.canon_added_absent).toContain('SPN-01');
    expect(reg.gaps.canon_added_absent.some((id) => id.startsWith('WRK'))).toBe(true);
  });
});
