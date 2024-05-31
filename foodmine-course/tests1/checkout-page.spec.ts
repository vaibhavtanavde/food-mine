//checkout-page.spec.ts
import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('CheckoutPageComponent', () => {
  beforeEach(() => {
    browser.sleep(2000); 
  });

  it('should add item to cart & check payment details', async () => {
    
    const FindMyLocation = element(by.css('.find-location')); 
    FindMyLocation.click(); 
    browser.sleep(2000);
    const mapElement = element(by.className('leaflet-container'));
    mapElement.click();
    browser.sleep(2000);
    const GoToPayment = element(by.css('button[_ngcontent-ng-c3269807487]'));
    GoToPayment.click();
    browser.wait(EC.urlContains('http://localhost:4200/payment'), 5000); 
    const cartQuantity = element(by.css('a[routerlink="/cart-page'));
    cartQuantity.click();
    browser.sleep(2000);
    const Remove = element(by.css('button[_ngcontent-ng-c471533846]'));
    Remove.click();
    browser.sleep(2000);
    const FoodMine = element(by.css('a.logo[routerlink="/"]'));
    FoodMine.click();
    browser.sleep(2000);
    const username = element(by.css('a[routerlink="/dashboard"]'));
    username.click();
    browser.sleep(2000);
    const Logout = element(by.linkText('Logout'));
    Logout.click();
    browser.sleep(2000);
  });
});