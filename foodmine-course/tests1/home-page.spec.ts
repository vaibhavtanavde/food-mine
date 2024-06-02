//home-page.spec.ts
import { browser, by, element } from 'protractor';

describe('Test Suite', () => {
  beforeEach(() => {
    browser.sleep(2000);
    browser.manage().window().maximize();
  });

  it('should display home form elements', () => {
  const foodname= element(by.css('img[src="assets/food-1.jpg"]')).click();
  browser.sleep(2000);
  });

  it('should add food item to cart and then remove it', () => {
    const AddToCart = element(by.css('button[_ngcontent-ng-c4203585026]')).click();
    browser.sleep(2000);
    const Remove = element(by.css('button[_ngcontent-ng-c471533846]')).click();
    browser.sleep(2000);
    });

    it('should navigate back to home page', () => {
      const FoodMine = element(by.css('a.logo[routerlink="/"]')).click();
      });

});
