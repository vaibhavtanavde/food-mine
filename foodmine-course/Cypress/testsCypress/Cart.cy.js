import { CartPage } from '../pagesCypress/CartPage';
import { LoginPage } from '../pagesCypress/LoginPage';

const loginPage = new LoginPage();
const cartPage = new CartPage()
describe('Cart Page Tests', () => {

  beforeEach(() => {
    const email = Cypress.env('testEmail');
    loginPage.loginSession(email, 'password');
  });


  it('Verify user should be able to check for food name', () => {
    cartPage.searchFood('Meatball');
    cartPage.getSearchedFoodText().should('contain.text', 'Meatball');
  });

  it('Verify user should be able to add food to the cart, change food item quantity and should be able to navigate to checkout page', () => {
    cartPage.clickFoodImage();
    cartPage.clickAddToCart();
    cartPage.selectQuantity('3');
    cartPage.getCartCount().should('have.text', '3');
    cy.url().should('include', 'cart-page');

    cartPage.getTotalPrice().should('not.be.empty');
    cy.url().should('include', 'cart-page');

    cartPage.clickCheckout();
    cy.url().should('include', '/checkout');
  });
});
