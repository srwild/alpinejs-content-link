import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';

const require = createRequire(import.meta.url);

test('ES module build exports a plugin that registers the directive', async () => {
  const { default: ContentLink } = await import('../dist/module.esm.js');
  let registeredDirective;

  ContentLink({
    directive(name, callback) {
      if (name === 'content-link') registeredDirective = callback;
    },
  });

  expect(registeredDirective).toEqual(expect.any(Function));
});

test('CommonJS build exports the plugin as its default export', () => {
  const { default: ContentLink } = require('../dist/module.cjs.js');

  expect(ContentLink).toEqual(expect.any(Function));
});

test('CDN build registers and runs the directive', async ({ page }) => {
  await page.setContent(`
    <article x-content-link>
      <button data-primary type="button">Primary</button>
      <p>Card content</p>
    </article>
  `);
  await page.evaluate(() => {
    window.Alpine = {
      directive(name, callback) {
        if (name === 'content-link') window.initializeDirective = callback;
      },
    };
  });
  await page.addScriptTag({
    path: fileURLToPath(new URL('../dist/cdn.js', import.meta.url)),
  });
  await page.evaluate(() => {
    document.dispatchEvent(new Event('alpine:initializing'));
    window.initializeDirective(
      document.querySelector('[x-content-link]'),
      {},
      { cleanup() {} },
    );
    window.primaryClicks = 0;
    document.querySelector('[data-primary]').addEventListener('click', () => {
      window.primaryClicks++;
    });
  });

  await page.locator('p').click();

  expect(await page.evaluate(() => window.primaryClicks)).toBe(1);
});
