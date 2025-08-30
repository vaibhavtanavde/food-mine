const { test, expect } = require('@playwright/test');
const { ensureUserAndSession, getSessionData, storagePath } = require('../utils/sessionManager');
const { LoginPage } = require('../pagesPlaywright/LoginPage');
const { CartPage } = require('../pagesPlaywright/CartPage');

test.use({ storageState: storagePath });

test.describe('Cart Page Tests', () => {
  let loginPage;
  let cartPage;

  test.beforeAll(async () => {
    await ensureUserAndSession(); // register + store session (only once)
  });

  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    await page.goto('http://localhost:4200');
  });

  test('Verify user should be able to check for food name', async () => {
    await cartPage.searchFood('Meatball');
    const foodLocator = cartPage.getSearchedFoodText();
    await expect(foodLocator).toContainText('Meatball');
  });

  test('Verify user should be able to add food to the cart, change food item quantity and should be able to navigate to checkout page', async ({ page }) => {
    await cartPage.clickFoodImage();
    await cartPage.clickAddToCart();
    await cartPage.selectQuantity('3');

    const cartCountLocator = cartPage.getCartCount();
    await expect(cartCountLocator).toHaveText('3');

    await expect(page).toHaveURL(/.*cart-page/);

    const totalPriceLocator = cartPage.getTotalPrice();
    await expect(totalPriceLocator).not.toBeEmpty();

    await cartPage.clickCheckout();
    await expect(page).toHaveURL(/.*\/checkout/);
  });
});
