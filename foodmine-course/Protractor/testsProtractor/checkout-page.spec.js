const checkoutPage = require('../pagesProtractor/checkout-page');
const registerPage = require('../pagesProtractor/register-page');

describe('Checkout Page Tests', () => {

  it('Verify user should be able to navigate to payment page', async () => {
    await checkoutPage.clickFindLocation();
    await checkoutPage.clickMap();
    await checkoutPage.clickGoToPayment();
    const url = await browser.getCurrentUrl();
    expect(url).toContain('/payment');
    await browser.navigate().back();
    const nameValue = await registerPage.nameInput.getAttribute('value');
    const addressValue = await registerPage.addressInput.getAttribute('value');
    expect(nameValue).toBe(browser.params.testName);
    expect(addressValue).toBe(browser.params.testAddress);
  });

  it('Verify user should be able to remove the food item from cart', async () => {
    await browser.get('http://localhost:4200/');
    await checkoutPage.goToCartPage();
    await checkoutPage.removeItem();
    const url = await browser.getCurrentUrl();
    expect(url).toContain('cart-page');
  });
});