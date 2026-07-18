/** `npm run jobs [-- --all]` — list durable async (video) jobs and their handles. */
import { listJobs, pendingJobs } from '../orchestration';

const jobs = process.argv.includes('--all') ? listJobs('vault') : pendingJobs('vault');
console.log(`# ${jobs.length} job(s)${process.argv.includes('--all') ? '' : ' pending'}`);
for (const j of jobs) {
  console.log(`  ${j.job_id}  ${j.asset_id.padEnd(9)} ${j.provider.padEnd(10)} ${j.state.padEnd(13)} handle=${j.job_handle ?? '-'}`);
}
