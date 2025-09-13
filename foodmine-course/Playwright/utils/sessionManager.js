const { chromium, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { RegisterPage } = require('../pagesPlaywright/RegisterPage');

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

  // Use RegisterPage
  const registerPage = new RegisterPage(page);

  // Generate unique email
  const email = `testuser_${Date.now()}@example.com`;
  const password = 'password';
  const name = 'John Doe';
  const address = '123 Test Lane';

  // Register using RegisterPage methods
  await registerPage.visitRegister();
  await registerPage.fillForm(name, email, password, address);
  await registerPage.submitForm();
  await registerPage.successMessage();
  await registerPage.verifyRedirectToHome();

  // Save session + user
  await context.storageState({ path: storagePath });
  fs.writeFileSync(
    userDataPath,
    JSON.stringify({ email, password, name, address }, null, 2)
  );

  await browser.close();
}

function getSessionData() {
  return JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));
}

module.exports = {
  ensureUserAndSession,
  getSessionData,
  storagePath
};
