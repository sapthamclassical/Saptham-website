import { z } from 'zod';
import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { GenerationRequestSchema, JobStateEnum } from '../domain';
import { readJson, writeJson } from '../storage/content-store';

/** Durable async-job record — persists the provider job_handle + request + meta so a
 *  multi-minute video job survives a process restart (PIPELINE_FLOW §5). */
export const AssetMetaSchema = z.object({
  asset_id: z.string(),
  batch: z.string(),
  category: z.string(),
  version: z.string(),
  naming: z.string(),
});

export const JobRecordSchema = z.object({
  job_id: z.string(),
  asset_id: z.string(),
  version: z.string(),
  provider: z.string(),
  model: z.string().nullable().default(null),
  state: JobStateEnum,
  job_handle: z.string().nullable().default(null),
  request: GenerationRequestSchema,
  meta: AssetMetaSchema,
  run_id: z.string(),
  attempts: z.number().int().default(0),
  last_error: z.string().nullable().default(null),
  created_at: z.string(),
});
export type JobRecord = z.infer<typeof JobRecordSchema>;

function jobPath(vault: string, jobId: string): string {
  return join(vault, 'jobs', `${jobId}.json`);
}

export function saveJob(vault: string, rec: JobRecord): void {
  writeJson(jobPath(vault, rec.job_id), JobRecordSchema.parse(rec));
}

export function loadJob(vault: string, jobId: string): JobRecord | null {
  const raw = readJson<unknown>(jobPath(vault, jobId));
  return raw ? JobRecordSchema.parse(raw) : null;
}

export function listJobs(vault: string): JobRecord[] {
  const dir = join(vault, 'jobs');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JobRecordSchema.parse(readJson(join(dir, f))));
}

export function pendingJobs(vault: string): JobRecord[] {
  return listJobs(vault).filter((j) => j.state !== 'succeeded' && j.state !== 'dead_letter');
}
