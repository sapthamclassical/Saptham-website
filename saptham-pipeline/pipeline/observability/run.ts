import { appendFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { RunManifestSchema, type CostEntry, type LogEvent, type RunManifest } from '../domain';
import { writeJson } from '../storage/content-store';

/** L8 Observability — one durable folder per invocation: manifest, JSONL log, cost, DLQ. */
export class RunRecorder {
  readonly dir: string;
  private totalCost = 0;
  private jobCount = 0;
  private retryCount = 0;
  private dlqCount = 0;

  constructor(private readonly vault: string, readonly runId: string, private readonly target: string) {
    this.dir = join(vault, 'runs', runId);
    mkdirSync(this.dir, { recursive: true });
  }

  log(event: Omit<LogEvent, 'ts' | 'run_id'>): void {
    const e = { ts: new Date().toISOString(), run_id: this.runId, ...event } satisfies LogEvent;
    appendFileSync(join(this.dir, 'log.jsonl'), JSON.stringify(e) + '\n', 'utf8');
  }

  cost(entry: Omit<CostEntry, 'ts' | 'run_id'>): void {
    this.totalCost += entry.cost;
    const e = { ts: new Date().toISOString(), run_id: this.runId, ...entry } satisfies CostEntry;
    appendFileSync(join(this.dir, 'costs.jsonl'), JSON.stringify(e) + '\n', 'utf8');
  }

  deadLetter(record: Record<string, unknown>): void {
    this.dlqCount += 1;
    appendFileSync(join(this.dir, 'dlq.jsonl'), JSON.stringify({ ts: new Date().toISOString(), ...record }) + '\n', 'utf8');
  }

  countJob(retries: number): void {
    this.jobCount += 1;
    this.retryCount += retries;
  }

  finalize(resolvedJobs: string[], policy: Record<string, unknown>, durationMs: number): RunManifest {
    const manifest = RunManifestSchema.parse({
      run_id: this.runId,
      ts: new Date().toISOString(),
      target: this.target,
      resolved_jobs: resolvedJobs,
      policy,
      totals: { cost: this.totalCost, count: this.jobCount, retries: this.retryCount, duration: durationMs },
      dlq_count: this.dlqCount,
    });
    writeJson(join(this.dir, 'manifest.json'), manifest);
    return manifest;
  }
}
