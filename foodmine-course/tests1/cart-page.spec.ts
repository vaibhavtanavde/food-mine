import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('Test Suite', () => {

  it('should check for food name', () => {   
    const cartItemfoodname = element(by.css('a[ng-reflect-router-link="/food/65957e915bbdf523e45b575e"]'));
    browser.wait(EC.visibilityOf(cartItemfoodname), 5000).then(() => {
      cartItemfoodname.getText().then((text) => {
        expect(text).toBe('Meatball');
      });
    });
  });

  it('should change food item qunatity', () => {
    const cartItemquantity = element(by.css('select[_ngcontent-ng-c471533846]'));
    cartItemquantity.click().then(() => {
      // Wait for the dropdown options to be visible
      browser.wait(EC.visibilityOf(element(by.cssContainingText('option', '3'))), 5000).then(() => {
        const option = element(by.cssContainingText('option', '3'));
        option.click();
      }); 
    });
  });

  it('should navigate to checkout page', () => {
    const ProceedtoCheckout = element(by.css('a[ng-reflect-router-link="/checkout"]'));
    ProceedtoCheckout.click();
    browser.wait(EC.urlContains('/checkout'), 5000);
    expect(browser.getCurrentUrl()).toContain('/checkout');
  }); 
  
});
