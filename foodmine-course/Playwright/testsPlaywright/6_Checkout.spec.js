const { test, expect } = require('@playwright/test');
const { ensureUserAndSession, getSessionData, storagePath } = require('../utils/sessionManager');
const { LoginPage } = require('../pagesPlaywright/LoginPage');
const { CartPage } = require('../pagesPlaywright/CartPage');
const { CheckoutPage } = require('../pagesPlaywright/CheckoutPage');

test.use({ storageState: storagePath });

test.describe('Food Page Tests', () => {
  let loginPage;
  let cartPage;
  let checkoutPage;

  test.beforeAll(async () => {
    await ensureUserAndSession(); // register + store session (only once)
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page)
    await page.goto('http://localhost:4200');
  });

  test('Verify user should be able to navigate to payment page', async () => {
    await cartPage.clickFoodImage();
    await cartPage.clickAddToCart();
    await cartPage.clickCheckout();

    await checkoutPage.clickFindLocation();
    await checkoutPage.clickMap();
    await checkoutPage.clickGoToPayment();
    await checkoutPage.goToCartPage();
    await checkoutPage.removeItem();
    await expect(checkoutPage.page).toHaveURL(/.*cart-page/);
  });
});
