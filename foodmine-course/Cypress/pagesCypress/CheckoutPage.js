export class CheckoutPage {
  findLocationBtn() {
    return cy.get('.find-location');
  }

  mapElement() {
    return cy.get('.leaflet-container');
  }

  goToPaymentBtn() {
    return cy.contains('button', 'Go To Payment');
  }

  cartLink() {
    return cy.get('a[routerlink="/cart-page"]');
  }

  removeBtn() {
    return cy.get('button[_ngcontent-ng-c471533846]'); // Consider replacing this with a more stable selector
  }

  clickFindLocation() {
    this.findLocationBtn().should('be.visible').click();
  }

  clickMap() {
    this.mapElement().should('be.visible').click();
  }

  clickGoToPayment() {
    this.goToPaymentBtn().should('be.visible').click();
    cy.url().should('include', '/payment');
  }

  goToCartPage() {
    this.cartLink().should('be.visible').click();
  }

  removeItem() {
    this.removeBtn().should('be.visible').click();
  }
}
