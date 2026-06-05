import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const url = 'https://nixtio.com/';
const outDir = path.resolve('qa/reference');

const viewports = [
  { name: 'desktop-1440', width: 1440, height: 1100 },
  { name: 'tablet-1024', width: 1024, height: 900 },
  { name: 'mobile-390', width: 390, height: 844 },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  channel: 'msedge',
  headless: true,
});

const report = {
  url,
  capturedAt: new Date().toISOString(),
  browser: 'Microsoft Edge via Playwright channel=msedge',
  viewports: [],
};

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1800);

  const topPath = path.join(outDir, `nixtio-${viewport.name}-top.png`);
  await page.screenshot({ path: topPath, fullPage: false });

  const metrics = await page.evaluate(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const read = () => {
      const body = document.body;
      const fixedSticky = [...document.querySelectorAll('*')]
        .filter((el) => {
          const style = getComputedStyle(el);
          return style.position === 'fixed' || style.position === 'sticky';
        })
        .slice(0, 12)
        .map((el) => {
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return {
            tag: el.tagName.toLowerCase(),
            text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
            position: style.position,
            top: style.top,
            zIndex: style.zIndex,
            rect: {
              x: Math.round(rect.x),
              y: Math.round(rect.y),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            },
          };
        });

      const textBlocks = [...document.querySelectorAll('h1,h2,h3,p,a,button,span')]
        .map((el) => {
          const rect = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          return {
            tag: el.tagName.toLowerCase(),
            text: (el.textContent || '').replace(/\s+/g, ' ').trim(),
            x: Math.round(rect.x),
            y: Math.round(rect.y + window.scrollY),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            fontSize: style.fontSize,
            fontFamily: style.fontFamily,
            fontWeight: style.fontWeight,
            lineHeight: style.lineHeight,
            letterSpacing: style.letterSpacing,
            textTransform: style.textTransform,
            opacity: style.opacity,
          };
        })
        .filter((item) => item.text && item.width > 5 && item.height > 5)
        .slice(0, 120);

      const animated = [...document.querySelectorAll('*')]
        .map((el) => {
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return {
            tag: el.tagName.toLowerCase(),
            className: String(el.className || '').slice(0, 120),
            text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60),
            transition: style.transition,
            animation: style.animation,
            transform: style.transform,
            overflow: style.overflow,
            clipPath: style.clipPath,
            rect: {
              x: Math.round(rect.x),
              y: Math.round(rect.y + window.scrollY),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            },
          };
        })
        .filter((item) =>
          item.transition !== 'all' ||
          item.animation !== 'none 0s ease 0s 1 normal none running' ||
          item.transform !== 'none' ||
          item.clipPath !== 'none'
        )
        .slice(0, 80);

      return {
        title: document.title,
        bodyText: body.innerText.replace(/\s+/g, ' ').trim().slice(0, 3000),
        pageHeight: body.scrollHeight,
        fixedSticky,
        textBlocks,
        animated,
      };
    };

    const scrollSamples = [];
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    for (const ratio of [0, 0.22, 0.45, 0.68, 0.9, 1]) {
      window.scrollTo({ top: Math.round(maxY * ratio), behavior: 'smooth' });
      await sleep(900);
      scrollSamples.push({
        ratio,
        scrollY: Math.round(window.scrollY),
        viewportText: document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)?.textContent
          ?.replace(/\s+/g, ' ')
          .trim()
          .slice(0, 200) || '',
      });
    }
    window.scrollTo(0, 0);
    await sleep(500);

    return {
      ...read(),
      scrollSamples,
    };
  });

  const fullPath = path.join(outDir, `nixtio-${viewport.name}-full.png`);
  await page.screenshot({ path: fullPath, fullPage: true });

  if (viewport.name === 'desktop-1440') {
    const scrollPositions = [0.32, 0.62, 0.92];
    for (const ratio of scrollPositions) {
      await page.evaluate((r) => {
        const maxY = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: Math.round(maxY * r), behavior: 'smooth' });
      }, ratio);
      await page.waitForTimeout(1100);
      await page.screenshot({
        path: path.join(outDir, `nixtio-${viewport.name}-scroll-${Math.round(ratio * 100)}.png`),
        fullPage: false,
      });
    }
  }

  report.viewports.push({
    ...viewport,
    topScreenshot: topPath,
    fullScreenshot: fullPath,
    ...metrics,
  });
  await page.close();
}

await browser.close();
await writeFile(path.join(outDir, 'nixtio-reference-report.json'), JSON.stringify(report, null, 2));
console.log(`Captured ${viewports.length} Nixtio viewport sets to ${outDir}`);
