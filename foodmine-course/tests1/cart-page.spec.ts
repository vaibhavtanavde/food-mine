import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('CartPageComponent', () => {
  beforeEach(() => {
  });

  it('should add to cart', () => {
    const cartItemfoodname = element(by.css('a[ng-reflect-router-link="/food/65957e915bbdf523e45b575e"]'));
    
    // Wait until the anchor is visible
    browser.wait(EC.visibilityOf(cartItemfoodname), 5000).then(() => {
      cartItemfoodname.getText().then((text) => {
        expect(text).toBe('Meatball');
      });

      // Select quantity
      const cartItemquantity = element(by.css('select[_ngcontent-ng-c471533846]'));
      cartItemquantity.click().then(() => {
        // Wait for the dropdown options to be visible
        browser.wait(EC.visibilityOf(element(by.cssContainingText('option', '3'))), 5000).then(() => {
          const option = element(by.cssContainingText('option', '3'));
          option.click();
          const ProceedtoCheckout = element(by.css('a[ng-reflect-router-link="/checkout"]'));
          ProceedtoCheckout.click().then(() => {
            // Optionally, you might want to wait for the checkout page to load
            browser.wait(EC.urlContains('/checkout'), 5000);
          });
        });
      });
    });
  });
});
