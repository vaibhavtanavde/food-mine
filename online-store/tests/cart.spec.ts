// cart.spec.ts
import { browser, by, element } from 'protractor';

describe('CartComponent', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('should add and remove items from cart', () => {
    const itemToAdd = 'Item 1';
    const itemToRemove = 'Item 1';

    const addToCartButton = element(by.css('#add-to-cart-button'));
    const removeFromCartButton = element(by.css('#remove-from-cart-button'));

    // Add item to cart
    // Add item to cart
    addToCartButton['click']();
    expect(element(by.css('#cart-item'))['getText']()).toContain(itemToAdd);

    // Remove item from cart
    // Remove item from cart
    removeFromCartButton['click']();
    expect(element(by.css('#cart-item')).isPresent()).toBeFalsy();
  });

  it('should display items in cart after adding multiple items', () => {
    const item1 = 'Item 1';
    const item2 = 'Item 2';

    const addToCartButton = element(by.css('#add-to-cart-button'));
    const viewCartButton = element(by.css('#view-cart-button'));

    // Add multiple items to cart
    // Add multiple items to cart
    addToCartButton['click']();
    addToCartButton['click']();

    // View cart
    // View cart
    viewCartButton['click']();

    // Check if items are displayed in cart
    expect(element(by.css('#cart-item'))['getText']()).toContain(item1);
    expect(element(by.css('#cart-item'))['getText']()).toContain(item2);
  });

  it('should not allow adding duplicate items to cart', async () => {
    const itemToAdd = 'Item 1';

    const addToCartButton = element(by.css('#add-to-cart-button'));

    // Add item to cart
    // Add item to cart
    addToCartButton['click']();
    expect(await element.all(by.css('#cart-item')).count()).toBe(1);


    // Attempt to add same item again
    // Attempt to add same item again
    addToCartButton['click']();
    expect(await element.all(by.css('#cart-item')).count()).toBe(1); // Should still be 1
  });

  // Add more tests as needed...
});
