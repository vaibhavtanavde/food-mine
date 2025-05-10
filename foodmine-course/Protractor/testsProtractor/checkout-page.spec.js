const checkoutPage = require('../pagesProtractor/checkout-page');

describe('Checkout Page Tests', () => {

  it('Verify user should be able to navigate to payment page', async () => {
    await checkoutPage.clickFindLocation();
    await checkoutPage.clickMap();
    await checkoutPage.clickGoToPayment();
    const url = await browser.getCurrentUrl();
    expect(url).toContain('/payment');
  });

  it('Verify user should be able to remove the food item from cart', async () => {
    await browser.get('http://localhost:4200/');
    await browser.sleep(2000);
    await checkoutPage.goToCartPage();
    await checkoutPage.removeItem();
    const url = await browser.getCurrentUrl();
    expect(url).toContain('cart-page');
  });
});