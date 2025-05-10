const { element, by, browser, ExpectedConditions: EC } = require('protractor');

class CheckoutPage {
  constructor() {
    this.findLocationBtn = element(by.css('.find-location'));
    this.mapElement = element(by.className('leaflet-container'));
    this.goToPaymentBtn = element(by.buttonText('Go To Payment'));
    this.cartLink = element(by.css('a[routerlink="/cart-page"]'));
    this.removeBtn = element(by.css('button[_ngcontent-ng-c471533846]'));
  }

  async clickFindLocation() {
    await browser.wait(EC.elementToBeClickable(this.findLocationBtn), 10000);
    await this.findLocationBtn.click();
  }

  async clickMap() {
    await browser.wait(EC.elementToBeClickable(this.mapElement), 10000);
    await this.mapElement.click();
  }

  async clickGoToPayment() {
    await browser.wait(EC.elementToBeClickable(this.goToPaymentBtn), 10000);
    await browser.waitForAngularEnabled(false);
    await this.goToPaymentBtn.click();
    await browser.wait(EC.urlContains('/payment'), 10000);
  }

  async goToCartPage() {
    await browser.wait(EC.elementToBeClickable(this.cartLink), 10000);
    await this.cartLink.click();
  }

  async removeItem() {
    await browser.wait(EC.elementToBeClickable(this.removeBtn), 10000);
    await this.removeBtn.click();
  }
}

module.exports = new CheckoutPage();