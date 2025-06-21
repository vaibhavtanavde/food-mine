export class CartPage {
  searchInput = 'input[placeholder="Lets Go"]';
  searchButton = 'button:contains("Search")';
  foodLink = 'a[href="/food/65957e915bbdf523e45b575e"]';
  foodImage = 'img[src="assets/food-2.jpg"]';
  addToCartButton = 'button:contains("Add To Cart")';
  quantityDropdown = 'select';
  cartCount = '.foods-count';
  totalPrice = '.total-price';
  checkoutButton = 'a[href="/checkout"]';
  cart = 'a[routerlink="/cart-page"]';

  searchFood(term) {
    cy.get(this.searchInput).type(term);
    cy.get(this.searchButton).click();
  }

  getSearchedFoodText() {
    return cy.get(this.foodLink);
  }

  selectQuantity(value) {
    cy.get(this.quantityDropdown).select(value);
  }

  getCartCount() {
    return cy.get(this.cartCount);
  }

  getTotalPrice() {
    return cy.get(this.totalPrice);
  }

  clickFoodImage() {
    cy.get(this.foodImage).click();
  }

  clickAddToCart() {
    cy.get(this.addToCartButton).click();
  }

  clickCheckout() {
    cy.get(this.checkoutButton).click();
  }

  clickCart(){
    cy.get(this.cart).click();
  }
}