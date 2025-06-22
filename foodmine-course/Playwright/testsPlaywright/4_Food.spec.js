import { test, expect } from '../testsPlaywright/fixtures';
import { LoginPage } from '../pagesPlaywright/LoginPage';
import { FoodPage } from '../pagesPlaywright/FoodPage';

test.describe('Food Page Tests', () => {
  let loginPage;
  let foodPage;

  test.beforeEach(async ({ page, testEmail }) => {
    loginPage = new LoginPage(page);
    foodPage = new FoodPage(page);

    await loginPage.login(testEmail, 'password');
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
