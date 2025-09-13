// playwright.config.js
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './foodmine-course/Playwright/testsPlaywright',
  timeout: 60000,
  expect: { timeout: 10000 },
  fullyParallel: false, // ✅ Enable full parallelism
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  workers: 1, // 👈 If you want full parallelism, consider increasing this (optional)
  use: {
    baseURL: 'http://localhost:4200',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
  ],
});
