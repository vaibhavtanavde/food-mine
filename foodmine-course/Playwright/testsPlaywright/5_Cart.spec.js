import { test, expect } from '../testsPlaywright/fixtures';
import { LoginPage } from '../pagesPlaywright/LoginPage';
import { CartPage } from '../pagesPlaywright/CartPage';

test.describe('Cart Page Tests', () => {
  let loginPage;
  let cartPage;

  test.beforeEach(async ({ page, testEmail }) => {
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);

    await loginPage.login(testEmail, 'password');
  });

  test('Verify user should be able to check for food name', async () => {
    await cartPage.searchFood('Meatball');
    const foodLocator = cartPage.getSearchedFoodText();
    await expect(foodLocator).toContainText('Meatball');
  });

  test('Verify user should be able to add food to the cart and proceed to checkout', async ({ page }) => {
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
