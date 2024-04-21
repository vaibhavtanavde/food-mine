//checkout-page.spec.ts
import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('CheckoutPageComponent', () => {
  beforeEach(() => {
    browser.sleep(2000); // Assuming '/checkout' is the route for checkout page
  });

  it('should initialize component with default values', async () => {
    element(by.css('a[ng-reflect-router-link="/"]')).click(); // Go to Home Page Link
    element(by.css('img[src="assets/food-1.jpg"]')).click();
    browser.sleep(2000);
    const addToCart = element(by.css('button[_ngcontent-ng-c3903630442]'));
    addToCart.click();

    element(by.css('a[ng-reflect-router-link="/checkout"]')).click(); // Proceed to Cart button
    browser.sleep(2000);  
    const nameInput = element(by.css('input[placeholder="Name"]'));
    const addressInput = element(by.css('input[placeholder="Address"]'));

    // Validate default values
    expect(await nameInput.getAttribute('value')).toBe('John Doe'); // Assuming 'John Doe' is the default name
    expect(await addressInput.getAttribute('value')).toBe('123 Street, City');
    browser.sleep(5000); 
  });

  it('Error message capture', async () => {
    const createOrder = element(by.css('button[_ngcontent-ng-c1064162151]'));
    await createOrder.click();
    await browser.wait(EC.visibilityOf(element(by.xpath("//div[@aria-label='Please select your location on the map']"))), 5000);
    let toastMessageText = await element(by.xpath("//div[@aria-label='Please select your location on the map']")).getText();

    // Assert that the captured text is what you expect
    expect(toastMessageText).toEqual('Please select your location on the map');
    console.log("Got the error message");

  });

  it('should create order on valid form submission', async () => {
    const mapElement = element(by.className('leaflet-container'));
    await mapElement.click();
    browser.sleep(2000);
    
    const createOrder = element(by.css('button[_ngcontent-ng-c1064162151]'));
    // Click create order button
    await createOrder.click();
    browser.sleep(2000);
    
    // Wait for navigation to payment page
    await browser.wait(EC.urlContains('/payment'), 5000);

    // Assert the URL is correct
    expect(await browser.getCurrentUrl()).toContain('/payment');
    console.log("Checkout page test passed");
  });
});
