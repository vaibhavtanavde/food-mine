export class CartPage {
  constructor(page) {
    this.page = page;
    this.searchInput = 'input[placeholder="Lets Go"]';
    this.searchButton = 'button:has-text("Search")';
    this.foodLink = 'a[href="/food/65957e915bbdf523e45b575e"]';
    this.foodImage = 'img[src="assets/food-2.jpg"]';
    this.addToCartButton = 'button:has-text("Add To Cart")';
    this.quantityDropdown = 'select';
    this.cartCount = '.foods-count';
    this.totalPrice = '.total-price';
    this.checkoutButton = 'a[href="/checkout"]';
    this.cart = 'a[routerlink="/cart-page"]';
  }

  async searchFood(term) {
    await this.page.fill(this.searchInput, term);
    await this.page.click(this.searchButton);
  }

  // Return Locator instead of string
  getSearchedFoodText() {
    return this.page.locator(this.foodLink);
  }

  async selectQuantity(value) {
    await this.page.selectOption(this.quantityDropdown, value);
  }

  // Return Locator instead of string
  getCartCount() {
    return this.page.locator(this.cartCount);
  }

  // Return Locator instead of string
  getTotalPrice() {
    return this.page.locator(this.totalPrice);
  }

  async clickFoodImage() {
    await this.page.click(this.foodImage);
  }

  async clickAddToCart() {
    await this.page.click(this.addToCartButton);
  }

  async clickCheckout() {
    await this.page.click(this.checkoutButton);
  }

  async clickCart() {
    await this.page.click(this.cart);
  }
}
