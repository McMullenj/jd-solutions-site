import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const candidates = [
  resolve('../split-frame'),
  resolve('split-frame'),
];

function isSplitFrameRoot(candidate) {
  return existsSync(resolve(candidate, 'pnpm-lock.yaml'));
}

function hasPublicSiteBuild(candidate) {
  return existsSync(resolve(candidate, 'scripts/build-public-site.mjs'));
}

for (const candidate of candidates) {
  if (isSplitFrameRoot(candidate) && hasPublicSiteBuild(candidate)) {
    process.stdout.write(candidate);
    process.exit(0);
  }
}

for (const candidate of candidates) {
  if (isSplitFrameRoot(candidate)) {
    process.stdout.write(candidate);
    process.exit(0);
  }
}

console.error('split-frame checkout not found (expected git submodule at split-frame/ or sibling ../split-frame)');
process.exit(1);
