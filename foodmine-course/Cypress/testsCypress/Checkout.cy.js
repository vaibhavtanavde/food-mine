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

  it('Verify user should be able to navigate to payment page and check name/address', () => {
    const name = Cypress.env('testName'); 
    const address = Cypress.env('testAddress');
  
    cartPage.clickFoodImage();
    cartPage.clickAddToCart();
    cartPage.clickCheckout();
    
    checkoutPage.clickFindLocation();
    checkoutPage.clickMap();
    checkoutPage.clickGoToPayment();
  
    cy.go('back');
  
    // Verify dynamic name and address
    cy.get('input[placeholder="Name"]').should('have.value', name);
    cy.get('input[placeholder="Address"]').should('have.value', address);
  
    checkoutPage.goToCartPage();
    checkoutPage.removeItem();
    cy.url().should('include', 'cart-page');
  });
  

});