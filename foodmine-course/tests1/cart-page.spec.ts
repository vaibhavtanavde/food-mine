import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('CartPageComponent', () => {
  beforeEach(() => {
    browser.sleep(2000);
  });


  it('should add item to cart', async () => {
    element(by.css('img[src="assets/food-1.jpg"]')).click();
    browser.sleep(2000);
    const addToCart= element(by.css('button[_ngcontent-ng-c3903630442]'));   
    addToCart.click();
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/cart-page');
  });

  it('should remove item from cart', async () => {
    const removeFromCart = element(by.css('button[_ngcontent-ng-c4187611182]'));
    removeFromCart.click();
    browser.sleep(2000);
    element(by.css('a[ng-reflect-router-link="/"]')).click(); // Go to Home Page Link
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/');
    console.log("Cart Page Test Passed");
  });
  
});
