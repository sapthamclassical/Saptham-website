/** `npm run plan -- --scene 06` — expand a storyboard scene into its asset job list. */
import { loadRegistryAssets, loadRegistryScenes } from '../registry';
import { planScene } from '../orchestration';

const i = process.argv.indexOf('--scene');
const sceneId = i >= 0 ? process.argv[i + 1] : undefined;
if (!sceneId) {
  console.error('usage: plan --scene <NN>');
  process.exit(1);
}

const plan = planScene(loadRegistryScenes(), loadRegistryAssets(), sceneId);
if (!plan) {
  console.error(`unknown scene: ${sceneId}`);
  process.exit(1);
}

console.log(`# scene ${plan.scene_id} — ${plan.name} (swara ${plan.swara ?? '·'})`);
console.log(`${plan.jobs.length} resolved job(s), ${plan.unresolved.length} unresolved:`);
for (const j of plan.jobs) console.log(`  ${j.priority}  ${j.asset_id.padEnd(9)} ${(j.family ?? '·').padEnd(10)} ${j.batch}`);
if (plan.unresolved.length) console.log(`  unresolved (not registered): ${plan.unresolved.join(', ')}`);
