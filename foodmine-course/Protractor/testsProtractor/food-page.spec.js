const foodPage = require('../pagesProtractor/food-page');

describe('Food Page Tests', () => {
  it('Verify user should be able to add and then remove a food item from the cart', async () => {
    await foodPage.clickFoodItem();
    await foodPage.addToCart();
    await foodPage.removeFromCart();
    const url = await foodPage.getCurrentUrl();
    expect(url).toContain('http://localhost:4200/cart-page');
  });

  it('Verify user should be able to navigate back to home page', async () => {
    await foodPage.clickLogo();
    const url = await foodPage.getCurrentUrl();
    expect(url).toContain('http://localhost:4200/');
  });
});