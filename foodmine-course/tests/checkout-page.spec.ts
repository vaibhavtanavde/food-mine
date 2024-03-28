import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('CheckoutPageComponent', () => {
  beforeEach(() => {
    browser.get('/checkout'); // Assuming '/checkout' is the route for checkout page
  });

  it('should initialize component with default values', async () => {
    // Assuming default user name and address are populated from userService.currentUser
    const nameInput = element(by.css('[formControlName="name"]'));
    const addressInput = element(by.css('[formControlName="address"]'));

    // Validate default values
    expect(await nameInput.getAttribute('value')).toBe('John Doe'); // Assuming 'John Doe' is the default name
    expect(await addressInput.getAttribute('value')).toBe('123 Main St'); // Assuming '123 Main St' is the default address
  });

  it('should display validation errors on invalid form submission', async () => {
    const nameInput = element(by.css('[formControlName="name"]'));
    const addressInput = element(by.css('[formControlName="address"]'));
    const createOrderButton = element(by.css('.create-order-button'));

    // Clear inputs
    await nameInput.clear();
    await addressInput.clear();

    // Click create order button
    await createOrderButton.click();

    // Check if validation errors are displayed
    expect(await element(by.css('.invalid-name-error')).isDisplayed()).toBeTruthy();
    expect(await element(by.css('.invalid-address-error')).isDisplayed()).toBeTruthy();
  });

  it('should create order on valid form submission', async () => {
    const nameInput = element(by.css('[formControlName="name"]'));
    const addressInput = element(by.css('[formControlName="address"]'));
    const createOrderButton = element(by.css('.create-order-button'));

    // Fill in valid inputs
    await nameInput.sendKeys('John Doe');
    await addressInput.sendKeys('123 Main St');

    // Click create order button
    await createOrderButton.click();

    // Wait for navigation to payment page
    await browser.wait(EC.urlContains('/payment'), 5000);

    // Assert the URL is correct
    expect(await browser.getCurrentUrl()).toContain('/payment');
  });
});
