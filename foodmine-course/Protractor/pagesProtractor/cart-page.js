const { element, by, browser, ExpectedConditions: EC } = require('protractor');

class CartPage {
  constructor() {
    this.searchInput = element(by.css('input[placeholder="Lets Go"]'));
    this.searchButton = element(by.buttonText('Search'));
    this.foodLink = element(by.css('a[ng-reflect-router-link="/food/65957e915bbdf523e45b575e"]'));
    this.foodImage = element(by.css('img[src="assets/food-2.jpg"]'));
    this.addToCartButton = element(by.buttonText('Add To Cart'));
    this.quantityDropdown = element(by.css('select[_ngcontent-ng-c471533846]'));
    this.quantityOption = (value) => element(by.cssContainingText('option', value));
    this.cartCount = element(by.css('.foods-count'));
    this.totalPrice = element(by.css('.total-price'));
    this.checkoutButton = element(by.css('a[ng-reflect-router-link="/checkout"]'));
  }

  async searchFood(term) {
    await this.searchInput.sendKeys(term);
    await this.searchButton.click();
  }

  async getSearchedFoodText() {
    await browser.wait(EC.visibilityOf(this.foodLink), 5000);
    return await this.foodLink.getText();
  }

  async selectQuantity(value) {
    await this.quantityDropdown.click();
    const option = this.quantityOption(value);
    await browser.wait(EC.visibilityOf(option), 5000);
    await option.click();
  }

  async getCartCount() {
    return await this.cartCount.getText();
  }

  async getTotalPrice() {
    return await this.totalPrice.getText();
  }

  async clickFoodImage() {
    await this.foodImage.click();
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
    await browser.wait(EC.urlContains('/checkout'), 5000);
  }
}

module.exports = new CartPage();