import { FoodPage } from '../pagesCypress/FoodPage';
import { loginWithSession } from '../utils/sessionManager';

const foodPage = new FoodPage();


describe('Food Page Tests', () => {
  beforeEach(() => {
    loginWithSession();
  });

  it('Verify user should be able to add and then remove a food item from the cart', () => {
    foodPage.clickFoodItem();
    foodPage.addToCart();
    foodPage.removeFromCart();
    foodPage.getCurrentUrl().should('include', '/cart-page');
  });
  
  
  it('Verify user should be able to navigate back to home page', () => {
    foodPage.clickLogo();
    foodPage.getCurrentUrl().should('eq', 'http://localhost:4200/');
  });
  
});