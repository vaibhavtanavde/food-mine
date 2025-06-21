import { test, expect } from '@playwright/test';
import { LoginPage } from '../pagesPlaywright/LoginPage';

test.describe('Login Page Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.visitHome();
    await loginPage.clickLogin();
  });

  test('should navigate to login page', async () => {
    await loginPage.verifyUrlContains('/login');
  });

  test('should navigate to register page', async () => {
    await loginPage.clickRegister();
    await loginPage.verifyUrlContains('/register');
  });
});
