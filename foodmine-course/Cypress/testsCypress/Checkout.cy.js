import { CheckoutPage } from '../pagesCypress/CheckoutPage';
import { CartPage } from '../pagesCypress/CartPage';
import { loginWithSession } from '../utils/sessionManager';

const checkoutPage = new CheckoutPage();
const cartPage = new CartPage();

describe('Checkout Page Tests', () => {

  beforeEach(() => {
    loginWithSession(); // logs in user once per session
  });

  it('Verify user should be able to navigate to payment page', () => {
    const name = Cypress.env('testName');
    const address = Cypress.env('testAddress');

    // Add food to cart and go to checkout
    cartPage.clickFoodImage();
    cartPage.clickAddToCart();
    cartPage.clickCheckout();

    // Navigate through checkout
    checkoutPage.clickFindLocation();
    checkoutPage.clickMap();
    checkoutPage.clickGoToPayment();

    // Go back to checkout page
    cy.go('back');

    // Verify pre-filled details
    cy.get('input[placeholder="Name"]').should('have.value', name);
    cy.get('input[placeholder="Address"]').should('have.value', address);

    // Clean up: remove item from cart
    checkoutPage.goToCartPage();
    checkoutPage.removeItem();
    cy.url().should('include', 'cart-page');
  });

});
