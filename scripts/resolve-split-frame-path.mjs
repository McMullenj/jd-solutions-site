import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const candidates = [
  resolve('split-frame'),
  resolve('../split-frame'),
];

for (const candidate of candidates) {
  if (existsSync(resolve(candidate, 'pnpm-lock.yaml'))) {
    process.stdout.write(candidate);
    process.exit(0);
  }
}

console.error('split-frame checkout not found (expected git submodule at split-frame/ or sibling ../split-frame)');
process.exit(1);
