export class FoodPage {
  foodItem() {
    return cy.get('img[src="assets/food-1.jpg"]');
  }

  addToCartButton() {
    return cy.contains('button', 'Add To Cart');
  }

  removeButton() {
    return cy.get('button.remove-button');
  }

  logo() {
    return cy.get('a.logo[routerlink="/"]');
  }

  clickFoodItem() {
    this.foodItem().click();
  }

  addToCart() {
    this.addToCartButton().click();
  }

  removeFromCart() {
    this.removeButton().click();
  }

  clickLogo() {
    this.logo().click();
  }

  getCurrentUrl() {
    return cy.url();
  }
}
