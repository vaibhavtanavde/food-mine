const { test, expect } = require('@playwright/test');
const { ensureUserAndSession, getSessionData, storagePath } = require('../utils/sessionManager');
const { LoginPage } = require('../pagesPlaywright/LoginPage');
const { FoodPage } = require('../pagesPlaywright/FoodPage');


test.use({ storageState: storagePath });

test.describe('Food Page Tests', () => {
  let loginPage;
  let foodPage;

  test.beforeAll(async () => {
    await ensureUserAndSession(); // register + store session (only once)
  });

  

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    foodPage = new FoodPage(page);
    await page.goto('http://localhost:4200');
  });

  test('Verify user should be able to add and then remove a food item from the cart', async ({ page }) => {
    await foodPage.clickFoodItem();
    await foodPage.addToCart();
    await foodPage.removeFromCart();
    await expect(page).toHaveURL(/.*\/cart-page/);
  });

  test('Verify user should be able to navigate back to home page', async ({ page }) => {
    await foodPage.clickLogo();
    await expect(page).toHaveURL('http://localhost:4200/');
  });
});
