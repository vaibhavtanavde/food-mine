// Import necessary modules
import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('Test Suite', () => {

  beforeEach(() => {
    browser.manage().window().maximize();
  });


  it('should add food item to cart', () => {
    const item = element(by.css('input[placeholder="Lets Go"]'));
    browser.wait(EC.visibilityOf(item), 5000); // Wait until the input is visible
    item.sendKeys("Meatball");
    item.getAttribute('value').then((itemValue) => {
    browser.sleep(2000);
    const Search = element(by.css('button[_ngcontent-ng-c1648554281]'));
    Search.click();
    browser.sleep(2000);
    const foodname = element(by.css('img[src="assets/food-2.jpg"]')).click();
    browser.sleep(2000);
    const AddToCart = element(by.css('button[_ngcontent-ng-c4203585026]')).click();
    browser.sleep(2000);
    browser.wait(EC.urlContains('http://localhost:4200/cart-page'), 5000); 
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/cart-page');
      });
  });

});