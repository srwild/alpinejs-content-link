import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

const source = await readFile(new URL('../src/index.js', import.meta.url), 'utf8');

const setup = async (page, markup) => {
  await page.setContent(markup);
  await page.addScriptTag({
    type: 'module',
    content: `${source}
      let initializeDirective;
      ContentLink({
        directive(name, callback) {
          if (name === 'content-link') initializeDirective = callback;
        },
      });
      initializeDirective(
        document.querySelector('[x-content-link]'),
        {},
        { cleanup() {} },
      );
      window.directiveReady = true;
    `,
  });
  await page.waitForFunction(() => window.directiveReady);
};

test('clicking card content activates the primary button once', async ({ page }) => {
  await setup(page, `
    <article x-content-link>
      <button data-primary type="button">Primary</button>
      <p>Card content</p>
    </article>
  `);
  await page.evaluate(() => {
    window.primaryClicks = 0;
    document.querySelector('[data-primary]').addEventListener('click', () => {
      window.primaryClicks++;
    });
  });

  await page.locator('p').click();

  expect(await page.evaluate(() => window.primaryClicks)).toBe(1);
});

test('clicking the primary button activates it once', async ({ page }) => {
  await setup(page, `
    <article x-content-link>
      <button data-primary type="button">Primary</button>
    </article>
  `);
  await page.evaluate(() => {
    window.primaryClicks = 0;
    document.querySelector('[data-primary]').addEventListener('click', () => {
      window.primaryClicks++;
    });
  });

  await page.locator('[data-primary]').click();

  expect(await page.evaluate(() => window.primaryClicks)).toBe(1);
});

test('clicking a nested button activates only the nested button once', async ({ page }) => {
  await setup(page, `
    <article x-content-link>
      <button data-primary type="button">Primary</button>
      <button data-nested type="button">Nested</button>
    </article>
  `);
  await page.evaluate(() => {
    window.primaryClicks = 0;
    window.nestedClicks = 0;
    document.querySelector('[data-primary]').addEventListener('click', () => {
      window.primaryClicks++;
    });
    document.querySelector('[data-nested]').addEventListener('click', () => {
      window.nestedClicks++;
    });
  });

  await page.locator('[data-nested]').click();

  expect(await page.evaluate(() => window.primaryClicks)).toBe(0);
  expect(await page.evaluate(() => window.nestedClicks)).toBe(1);
});
