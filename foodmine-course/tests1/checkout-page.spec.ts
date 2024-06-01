//checkout-page.spec.ts
import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('CheckoutPageComponent', () => {
  beforeEach(() => {
    browser.sleep(2000); 
  });

  it('should add item to cart & check payment details', async () => {
    
    const FindMyLocation = element(by.css('.find-location')).click();
    browser.sleep(2000);
    const mapElement = element(by.className('leaflet-container')).click();
    browser.sleep(2000);
    const GoToPayment = element(by.css('button[_ngcontent-ng-c3269807487]')).click();
    browser.wait(EC.urlContains('http://localhost:4200/payment'), 5000); 
    const cartQuantity = element(by.css('a[routerlink="/cart-page')).click();
    browser.sleep(2000);
    const Remove = element(by.css('button[_ngcontent-ng-c471533846]')).click();
    browser.sleep(2000);
    const FoodMine = element(by.css('a.logo[routerlink="/"]')).click();
    browser.sleep(2000);
    const username = element(by.css('a[routerlink="/dashboard"]')).click();
    browser.sleep(2000);
    const Logout = element(by.linkText('Logout')).click();
    browser.sleep(2000);
  });
});