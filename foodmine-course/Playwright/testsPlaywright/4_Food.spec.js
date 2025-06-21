import { test, expect } from '@playwright/test';
import { LoginPage } from '../pagesPlaywright/LoginPage';
import { FoodPage } from '../pagesPlaywright/FoodPage';

test.describe('Food Page Tests', () => {
  let loginPage;
  let foodPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    foodPage = new FoodPage(page);

    const email = process.env.TEST_EMAIL;
    await loginPage.login(email, 'password');
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
