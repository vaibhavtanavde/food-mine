import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('CartPageComponent', () => {
  beforeEach(() => {
    browser.get('/cart');
  });

  it('should display the cart items', () => {
    expect(element(by.css('.cart-item')).isPresent()).toBeTruthy();
    // Add more expectations as needed to verify the presence of specific elements or data in the cart
  });

  it('should remove item from cart', async () => {
    const initialCartItemCount = await element.all(by.css('.cart-item')).count();
    const removeButton = element.all(by.css('.remove-button')).first();

    removeButton.click();

    // Wait for the cart to update after removing item
    await browser.wait(EC.stalenessOf(removeButton), 5000);

    // Verify that the cart item count has decreased
    const newCartItemCount = await element.all(by.css('.cart-item')).count();
    expect(newCartItemCount).toBe(initialCartItemCount - 1);
  });

  it('should have a count of 5', async () => {
    const count = await element.all(by.css('.cart-item')).count();
    expect(count).toBe(5);
  });

  it('should change quantity of item in cart', async () => {
    const quantityInput = element.all(by.css('.quantity-input')).first();
    const initialQuantity = await quantityInput.getAttribute('value');
    const newQuantity = parseInt(initialQuantity) + 1;

    // Change the quantity
    quantityInput.clear();
    quantityInput.sendKeys(newQuantity.toString());

    // Wait for the cart to update after changing quantity
    await browser.sleep(1000); // Wait for debounce or any other async operation to complete

    // Add assertions related to changing quantity if needed
  });

  it('should verify the text of an element', async () => {
    const elementText = await element(by.css('.some-element')).getText();
    // Here, element(by.css('.some-element')).getText() returns a Promise<string>
    // We use await to resolve the promise, and then we can use the resulting string
    
    expect(elementText).toBe('Expected Text'); // This line should work fine
  });

  // Add more tests as needed...
});
