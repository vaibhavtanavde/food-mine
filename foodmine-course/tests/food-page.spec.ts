// Import necessary modules
import { browser, by, element } from 'protractor';

describe('FoodPageComponent', () => {
  beforeEach(() => {
    // Navigate to the food page
    browser.get('/food-page');
  });

  it('should display food details', () => {
    // Simulate navigation to a specific food item
    const foodId = '123'; // Replace with a valid food id from your application
    browser.get(`/food-page/${foodId}`);

    // Verify that the food details are displayed correctly
    const foodName = element(by.css('.food-name')).getText();
    expect(foodName).toEqual(Promise.resolve('Test Food')); // Ensure foodName is resolved as a promise

    // You can add more expectations here to verify other details if needed
  });

  it('should add food to cart', () => {
    // Simulate adding food to the cart
    const addToCartButton = element(by.css('.add-to-cart-button'));
    addToCartButton.click();

    // Verify that the food is added to the cart
    const cartItemCount = element(by.css('.cart-item-count')).getText();
    expect(cartItemCount).toEqual(Promise.resolve('1')); // Ensure cartItemCount is resolved as a promise
  });

  it('should navigate to cart page after adding food to cart', () => {
    // Simulate adding food to the cart
    const addToCartButton = element(by.css('.add-to-cart-button'));
    addToCartButton.click();

    // Verify that the browser navigates to the cart page
    browser.getCurrentUrl().then(url => {
      expect(url).toEqual(browser.baseUrl + '/cart-page');
    });
  });
});
