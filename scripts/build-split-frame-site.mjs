import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const splitFrameRoot = spawnSync('node', ['scripts/resolve-split-frame-path.mjs'], {
  cwd: root,
  encoding: 'utf8',
}).stdout.trim();

if (!splitFrameRoot) {
  process.exit(1);
}

function run(cwd, command, args, extraEnv = {}) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    env: {
      ...process.env,
      ...extraEnv,
    },
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run(root, 'pnpm', ['-C', splitFrameRoot, 'install', '--frozen-lockfile']);

const siteEnv = {
  VITE_SITE_BASE_PATH: '/split-frame/',
  VITE_APP_BASE_PATH: '/split-frame/app',
  VITE_API_BASE_URL: process.env.VITE_API_BASE_URL ?? '',
  VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL ?? '',
  VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY ?? '',
  VITE_AUTH_MODE: process.env.VITE_AUTH_MODE ?? 'supabase',
};

run(splitFrameRoot, 'node', ['scripts/build-public-site.mjs'], siteEnv);

const sourceDist = resolve(splitFrameRoot, 'apps/web/dist');
const targetDist = resolve(root, 'apps/web/dist/split-frame');

if (!existsSync(sourceDist)) {
  console.error(`Split Frame site build output missing at ${sourceDist}`);
  process.exit(1);
}

rmSync(targetDist, { recursive: true, force: true });
mkdirSync(targetDist, { recursive: true });
cpSync(sourceDist, targetDist, { recursive: true });

console.log(`Merged Split Frame public site into ${targetDist}`);
