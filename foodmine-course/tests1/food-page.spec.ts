// Import necessary modules
//food-page.spec.js
import { browser, by, element } from 'protractor';

describe('FoodPageComponent', () => {

  beforeEach(async () => {
    browser.sleep(2000);
  });

  it('should add item to cart', () => {
    
    element(by.css('img[src="assets/food-1.jpg"]')).click();
    browser.sleep(2000);
    const addToCart = element(by.css('button[_ngcontent-ng-c3903630442]'));
    addToCart.click();
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/cart-page');
    console.log("Food Page Test Passed");
  });

});
