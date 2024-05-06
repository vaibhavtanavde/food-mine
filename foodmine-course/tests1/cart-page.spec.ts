// cart-page.spec.ts
import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('CartPageComponent', () => {
  beforeEach(() => {
    browser.sleep(2000);
  });

  const addToCart = async () => {
    const addToCartButton = element(by.css('button[_ngcontent-ng-c3903630442]'));
    await addToCartButton.click();
    await browser.sleep(2000);
  };

  const removeFromCart = async () => {
    const removeFromCartButton = element(by.css('button[_ngcontent-ng-c4187611182]'));
    await removeFromCartButton.click();
    await browser.sleep(2000);
  };

  it('should add to cart', async () => {
    element(by.css('img[src="assets/food-1.jpg"]')).click();
    await addToCart();
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/cart-page');
  });

  it('should remove from cart', async () => {
    await removeFromCart();
    element(by.css('a[ng-reflect-router-link="/"]')).click(); // Go to Home Page Link
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/');
    console.log("Cart Page Test Passed");
  });
});
