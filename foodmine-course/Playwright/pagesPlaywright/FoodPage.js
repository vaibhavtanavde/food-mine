export class FoodPage {
  constructor(page) {
    this.page = page;
  }

  async clickFoodItem() {
    await this.page.click('img[src="assets/food-1.jpg"]');
  }

  async addToCart() {
    await this.page.getByRole('button', { name: 'Add To Cart' }).click();
  }

  async removeFromCart() {
    await this.page.click('button.remove-button');
  }

  async clickLogo() {
    await this.page.click('a.logo[routerlink="/"]');
  }

  async getCurrentUrl() {
    return this.page.url();
  }
}
