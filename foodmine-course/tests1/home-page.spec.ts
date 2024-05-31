//home.spec.ts
import { browser, by, element } from 'protractor';

describe('HomeComponent', () => {
  beforeEach(() => {
    browser.sleep(2000);
    browser.manage().window().maximize();
  });

  it('should display home form elements', () => {
  const foodname= element(by.css('img[src="assets/food-1.jpg"]'));
  foodname.click();
  browser.sleep(2000);
  const AddToCart = element(by.css('button[_ngcontent-ng-c4203585026]'));
  AddToCart.click();
  browser.sleep(2000);
  const Remove = element(by.css('button[_ngcontent-ng-c471533846]'));
  Remove.click();
  browser.sleep(2000);
  const FoodMine = element(by.css('a.logo[routerlink="/"]'));
  FoodMine.click();
  });

});
