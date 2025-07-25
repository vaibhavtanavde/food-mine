import { test, expect } from '../testsPlaywright/fixtures';
import { RegisterPage } from '../pagesPlaywright/RegisterPage';

test.describe('Register Page Tests', () => {
  let registerPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.visitRegister();
  });

  test('should display all register form fields', async ({ page }) => {
    await expect(page.locator(registerPage.nameInput)).toBeVisible();
    await expect(page.locator(registerPage.emailInput)).toBeVisible();
    await expect(page.locator(registerPage.passwordInput)).toBeVisible();
    await expect(page.locator(registerPage.confirmPasswordInput)).toBeVisible();
    await expect(page.locator(registerPage.addressInput)).toBeVisible();
    await expect(page.locator(registerPage.submitButton)).toBeVisible();
  });

  test('should register a new user successfully', async ({ testEmail }) => {
    await registerPage.fillForm('John Doe', testEmail, 'password', '123 Street, City');
    await registerPage.submitForm();
    await registerPage.verifyRedirectToHome();
  });
})  
