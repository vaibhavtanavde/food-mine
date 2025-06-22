import { test, expect } from '../testsPlaywright/fixtures';
import { LoginPage } from '../pagesPlaywright/LoginPage';
import { CheckoutPage } from '../pagesPlaywright/CheckoutPage';
import { CartPage } from '../pagesPlaywright/CartPage';

test.describe('Checkout Page Tests', () => {
  let loginPage;
  let checkoutPage;
  let cartPage;

  test.beforeEach(async ({ page, testEmail }) => {
    loginPage = new LoginPage(page);
    checkoutPage = new CheckoutPage(page);
    cartPage = new CartPage(page);

    await loginPage.login(testEmail, 'password');
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
