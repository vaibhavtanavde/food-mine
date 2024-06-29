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
      option.getText().then(function(optionText) {
      option.click();
      const carttotalCount = element(by.css('.foods-count')).getText();
      carttotalCount.then(function(cartText) {
        if (optionText === cartText) {
            console.log("Pass");
        } else {
            console.log("Fail");
        }
    });
});
      }); 
    });
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/cart-page');  
  });

  it('should verify price after quantity change', () => {
    const priceElement = element.all(by.css('div[_ngcontent-ng-c471533846]')).get(5);
    priceElement.getText();
    const carttotalPrice = element(by.css('.total-price'));
    carttotalPrice.getText();
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/cart-page');
  });

  it('should navigate to checkout page', () => {
    const ProceedtoCheckout = element(by.css('a[ng-reflect-router-link="/checkout"]'));
    ProceedtoCheckout.click();
    browser.wait(EC.urlContains('/checkout'), 5000);
    expect(browser.getCurrentUrl()).toContain('/checkout');
  }); 
  
});
