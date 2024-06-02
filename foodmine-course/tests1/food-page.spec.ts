// Import necessary modules
import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('Test Suite', () => {

  beforeEach(() => {
    browser.manage().window().maximize();
  });

  it('should search for food item', () => {   
    const item = element(by.css('input[placeholder="Lets Go"]'));
    browser.wait(EC.visibilityOf(item), 5000); // Wait until the input is visible
    item.sendKeys("Meatball");
    item.getAttribute('value').then((itemValue) => {
      browser.sleep(2000);
      const Search = element(by.css('button[_ngcontent-ng-c882576285]')).click();
      browser.sleep(2000);
      });
    });

    it('should add food item to cart', () => {
      const foodname = element(by.css('img[src="assets/food-2.jpg"]')).click();
      browser.sleep(2000);
      const AddToCart = element(by.css('button[_ngcontent-ng-c4203585026]')).click();
      browser.sleep(2000);
      browser.wait(EC.urlContains('http://localhost:4200/cart-page'), 5000); // Wait for URL to change
      });
  });

