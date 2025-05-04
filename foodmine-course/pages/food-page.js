const { browser, by, element } = require('protractor');

class FoodPage {
  constructor() {
    this.foodItem = element(by.css('img[src="assets/food-1.jpg"]'));
    this.addToCartButton = element(by.buttonText('Add To Cart'));
    this.removeButton = element(by.css('button.remove-button'));
    this.logo = element(by.css('a.logo[routerlink="/"]'));
  }

  async clickFoodItem() {
    await this.foodItem.click();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async removeFromCart() {
    await this.removeButton.click();
  }

  async clickLogo() {
    await this.logo.click();
  }

  async getCurrentUrl() {
    return await browser.getCurrentUrl();
  }
}

module.exports = new FoodPage();