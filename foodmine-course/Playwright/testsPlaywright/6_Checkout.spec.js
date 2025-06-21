import { test, expect } from '@playwright/test';
import { LoginPage } from '../pagesPlaywright/LoginPage';
import { CheckoutPage } from '../pagesPlaywright/CheckoutPage';
import { CartPage } from '../pagesPlaywright/CartPage';

test.describe('Checkout Page Tests', () => {
  let loginPage;
  let checkoutPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    checkoutPage = new CheckoutPage(page);
    cartPage = new CartPage(page);

    const email = process.env.TEST_EMAIL;
    await loginPage.login(email, 'password');
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
