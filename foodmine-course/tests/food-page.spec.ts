// Import necessary modules
import { browser, by, element } from 'protractor';

describe('FoodPageComponent', () => {
  beforeEach(() => {
    // Navigate to the food page
    browser.sleep(2000);
  });


  it('should add food to cart', () => {
    
    element(by.css('img[src="assets/food-1.jpg"]')).click();
    browser.sleep(2000);
    const addToCart = element(by.css('button[_ngcontent-ng-c3903630442]'));
    addToCart.click();
    console.log("Food Page Test Passed");
  });

});
