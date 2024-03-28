// cart.spec.js
const cartPage = require('../cart');

describe('Cart functionality', () => {
    it('should add items to cart', () => {
        // Mocking user action
        cartPage.addToCart('Item 1');
        cartPage.addToCart('Item 2');

        // Retrieving cart items
        const cartItems = cartPage.viewCart();

        // Asserting items are added to cart
        expect(cartItems.length).toBe(2);
    });

    it('should remove items from cart', () => {
        // Mocking user action
        cartPage.addToCart('Item 3');
        cartPage.addToCart('Item 4');
        cartPage.removeFromCart('Item 3');

        // Retrieving cart items
        const cartItems = cartPage.viewCart();

        // Asserting item is removed from cart
        expect(cartItems).not.toContain('Item 3');
    });
});
