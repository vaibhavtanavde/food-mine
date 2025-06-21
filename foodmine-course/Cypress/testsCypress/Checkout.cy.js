import { CheckoutPage } from '../pagesCypress/CheckoutPage';
import { LoginPage } from '../pagesCypress/LoginPage';
import { CartPage } from '../pagesCypress/CartPage';

const checkoutPage = new CheckoutPage();
const loginPage = new LoginPage();
const cartPage = new CartPage()

describe('Checkout Page Tests', () => {

  beforeEach(() => {
    const email = Cypress.env('testEmail');
    loginPage.loginSession(email, 'password');
  });

  it('Verify user should be able to navigate to payment page', () => {
    cartPage.clickFoodImage();
    cartPage.clickAddToCart();
    cartPage.clickCheckout();
    
    checkoutPage.clickFindLocation();
    checkoutPage.clickMap();
    checkoutPage.clickGoToPayment();

    checkoutPage.goToCartPage();
    checkoutPage.removeItem();
    cy.url().should('include', 'cart-page');
  });

});