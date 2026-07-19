import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';

const repoRoot = join(import.meta.dirname, '../../..');
const webRoot = join(repoRoot, 'apps/web');
const netlifyToml = readFileSync(join(repoRoot, 'netlify.toml'), 'utf8');

function walkFiles(dir: string, acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === 'node_modules' || entry === 'dist' || entry === 'split-frame') continue;
      walkFiles(full, acc);
    } else {
      acc.push(full);
    }
  }
  return acc;
}

describe('Axel subsite isolation', () => {
  it('proxies /axel to the independent Axel Netlify origin before other rewrites', () => {
    const axelIndex = netlifyToml.indexOf('from = "/axel/*"');
    const splitIndex = netlifyToml.indexOf('from = "/split-frame/*"');
    const spaIndex = netlifyToml.indexOf('from = "/*"');

    assert.ok(axelIndex >= 0, 'missing /axel/* redirect');
    assert.ok(splitIndex > axelIndex, '/axel proxy must precede Split Frame');
    assert.ok(spaIndex > axelIndex, '/axel proxy must precede SPA fallback');
    assert.match(
      netlifyToml,
      /to = "https:\/\/axelskating\.netlify\.app\/axel\/:splat"/,
    );
    assert.match(netlifyToml, /status = 200/);
    assert.match(netlifyToml, /force = true/);
  });

  it('does not vendor FigureItOut source, packages, or submodules', () => {
    const gitmodulesPath = join(repoRoot, '.gitmodules');
    if (existsSync(gitmodulesPath)) {
      const gitmodules = readFileSync(gitmodulesPath, 'utf8');
      assert.doesNotMatch(gitmodules, /figureitout|FigureItOut/i);
    }

    const packageJson = readFileSync(join(repoRoot, 'package.json'), 'utf8');
    assert.doesNotMatch(packageJson, /figureitout|axel-website/i);

    const sourceFiles = walkFiles(join(webRoot, 'src'));
    for (const file of sourceFiles) {
      if (file.endsWith('.test.ts') || file.endsWith('.test.mjs')) continue;
      const contents = readFileSync(file, 'utf8');
      assert.doesNotMatch(contents, /from ['"]figureitout/i);
      assert.doesNotMatch(contents, /FigureItOut\/public-website/);
    }
  });

  it('links Axel with a document navigation anchor under /axel/', () => {
    const data = readFileSync(join(webRoot, 'src/apps/jd-solutions/data.ts'), 'utf8');
    assert.match(data, /label: 'Axel'/);
    assert.match(data, /href: '\/axel\/'/);

    const work = readFileSync(
      join(webRoot, 'src/apps/jd-solutions/components/Work.tsx'),
      'utf8',
    );
    assert.doesNotMatch(work, /<Link[^>]+to=\{tile\.href\}/);
    assert.match(work, /<a className=\{className\} href=\{tile\.href\}/);
  });

  it('owns root robots/sitemap and references the proxied Axel child sitemap', () => {
    const robots = readFileSync(join(webRoot, 'public/robots.txt'), 'utf8');
    const sitemap = readFileSync(join(webRoot, 'public/sitemap.xml'), 'utf8');
    assert.match(robots, /Sitemap: https:\/\/jd-solutions-site\.netlify\.app\/sitemap\.xml/);
    assert.match(
      sitemap,
      /https:\/\/jd-solutions-site\.netlify\.app\/axel\/sitemap\.xml/,
    );
  });
});
