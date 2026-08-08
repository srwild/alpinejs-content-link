import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
