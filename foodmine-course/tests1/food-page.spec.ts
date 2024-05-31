// Import necessary modules
import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('FoodPageComponent', () => {

  beforeEach(() => {
    browser.manage().window().maximize();
  });

  it('should add item to cart', () => {   
    const item = element(by.css('input[placeholder="Lets Go"]'));
    browser.wait(EC.visibilityOf(item), 5000); // Wait until the input is visible
    item.sendKeys("Meatball");
    
    item.getAttribute('value').then((itemValue) => {
      const Search = element(by.css('button[_ngcontent-ng-c882576285]'));
      browser.wait(EC.elementToBeClickable(Search), 5000); // Wait until the button is clickable
      Search.click();

      const foodname = element(by.css('img[src="assets/food-2.jpg"]'));
      browser.wait(EC.elementToBeClickable(foodname), 5000); // Wait until the image is clickable
      foodname.click();

      const AddToCart = element(by.css('button[_ngcontent-ng-c4203585026]'));
      browser.wait(EC.elementToBeClickable(AddToCart), 5000); // Wait until the button is clickable
      AddToCart.click();

      browser.wait(EC.urlContains('http://localhost:4200/cart-page'), 5000); // Wait for URL to change
      });
    });
  });

