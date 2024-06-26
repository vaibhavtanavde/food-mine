import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('CartPageComponent', () => {
  beforeEach(() => {
    browser.sleep(2000);
  });


  it('should remove item from cart', async () => {
    element(by.css('img[src="assets/food-1.jpg"]')).click();
    browser.sleep(2000);
    element(by.css('button[_ngcontent-ng-c3903630442]')).click();   //add to cart
    
    const removeButton = element(by.css('button[_ngcontent-ng-c4187611182]'));
    removeButton.click();
    
    browser.sleep(2000);
    element(by.css('a[ng-reflect-router-link="/"]')).click(); // Go to Home Page Link
    console.log("Cart Page Test Passed");
  });

});
