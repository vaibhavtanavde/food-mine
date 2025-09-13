const { test, expect } = require('@playwright/test');
const { ensureUserAndSession, getSessionData } = require('../utils/sessionManager');
const { RegisterPage } = require('../pagesPlaywright/RegisterPage');

test.describe('Register Page Tests', () => {
  let registerPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.visitRegister();
  });

  test('Verify user should be able to display all register form fields and successfully login', async ({ page }) => {
    await expect(page.locator(registerPage.nameInput)).toBeVisible();
    await expect(page.locator(registerPage.emailInput)).toBeVisible();
    await expect(page.locator(registerPage.passwordInput)).toBeVisible();
    await expect(page.locator(registerPage.confirmPasswordInput)).toBeVisible();
    await expect(page.locator(registerPage.addressInput)).toBeVisible();
    await expect(page.locator(registerPage.submitButton)).toBeVisible();

    await ensureUserAndSession(); // register + store session (only once)
  });
});
