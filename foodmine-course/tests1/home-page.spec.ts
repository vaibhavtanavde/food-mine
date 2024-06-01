//home.spec.ts
import { browser, by, element } from 'protractor';

describe('HomeComponent', () => {
  beforeEach(() => {
    browser.sleep(2000);
    browser.manage().window().maximize();
  });

  it('should display home form elements', () => {
  const foodname= element(by.css('img[src="assets/food-1.jpg"]')).click();
  browser.sleep(2000);
  const AddToCart = element(by.css('button[_ngcontent-ng-c4203585026]')).click();
  browser.sleep(2000);
  const Remove = element(by.css('button[_ngcontent-ng-c471533846]')).click();
  browser.sleep(2000);
  const FoodMine = element(by.css('a.logo[routerlink="/"]')).click();
  });

});
