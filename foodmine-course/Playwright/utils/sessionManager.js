// utils/sessionManager.js
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const storagePath = path.resolve(__dirname, '../storageState.json');
const userDataPath = path.resolve(__dirname, '../test-user.json');

const appUrl = 'http://localhost:4200';

async function ensureUserAndSession() {
  if (fs.existsSync(storagePath) && fs.existsSync(userDataPath)) {
    return; // session and user already exist
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Generate unique email
  const email = `testuser_${Date.now()}@example.com`;
  const password = 'password';

  // Register
  await page.goto(`${appUrl}/register`);
  await page.fill('input[placeholder="Name"]', 'Test User');
  await page.fill('input[placeholder="Email"]', email);
  await page.fill('input[placeholder="Password"]', password);
  await page.fill('input[placeholder="Confirm Password"]', password);
  await page.fill('input[placeholder="Address"]', '123 Test Lane');
  await page.click('button[type="submit"]');
  await page.waitForURL(`${appUrl}/`);

  // Save session + user
  await context.storageState({ path: storagePath });
  fs.writeFileSync(userDataPath, JSON.stringify({ email, password }));

  await browser.close();
}

function getSessionData() {
  const { email, password } = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));
  return { email, password };
}

module.exports = {
  ensureUserAndSession,
  getSessionData,
  storagePath
};
