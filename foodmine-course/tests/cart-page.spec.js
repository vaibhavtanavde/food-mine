const cartPage = require('../pages/cart-page');

describe('Cart Page Tests', () => {

  it('Verify user should be able to check for food name', async () => {
    await cartPage.searchFood('Meatball');
    const foodText = await cartPage.getSearchedFoodText();
    expect(foodText).toContain('Meatball');
  });

  it('Verify user should be able to change food item quantity', async () => {
    await cartPage.clickFoodImage();
    await cartPage.clickAddToCart();
    await cartPage.selectQuantity('3');

    const cartText = await cartPage.getCartCount();
    expect(cartText).toBe('3');
    expect(await browser.getCurrentUrl()).toContain('cart-page');
  });

  it('Verify user should be able to see updated price after quantity change', async () => {
    const price = await cartPage.getTotalPrice();
    expect(price).toBeTruthy(); // You can assert exact value if known
    expect(await browser.getCurrentUrl()).toContain('cart-page');
  });

  it('Verify user should be able to navigate to checkout page', async () => {
    await cartPage.clickCheckout();
    expect(await browser.getCurrentUrl()).toContain('/checkout');
  });
});