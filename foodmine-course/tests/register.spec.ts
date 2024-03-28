import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('RegisterPageComponent', () => {
  beforeEach(() => {
    browser.get('/register');
  });

  it('should display register form elements', () => {
    expect(element(by.css('form[name="registerForm"]')).isPresent()).toBeTruthy();
    expect(element(by.css('input[name="name"]')).isPresent()).toBeTruthy();
    expect(element(by.css('input[name="email"]')).isPresent()).toBeTruthy();
    expect(element(by.css('input[name="password"]')).isPresent()).toBeTruthy();
    expect(element(by.css('input[name="confirmPassword"]')).isPresent()).toBeTruthy();
    expect(element(by.css('textarea[name="address"]')).isPresent()).toBeTruthy();
    expect(element(by.css('button[type="submit"]')).isPresent()).toBeTruthy();
  });

  it('should display error messages for invalid form fields', () => {
    element(by.css('button[type="submit"]')).click();
    expect(element(by.css('.error-message')).isPresent()).toBeTruthy();
    expect(element(by.css('.error-message')).getText()).toContain('Name is required');
    // Add similar expectations for other required fields
  });

  it('should register a new user', () => {
    const nameInput = element(by.css('input[name="name"]'));
    const emailInput = element(by.css('input[name="email"]'));
    const passwordInput = element(by.css('input[name="password"]'));
    const confirmPasswordInput = element(by.css('input[name="confirmPassword"]'));
    const addressInput = element(by.css('textarea[name="address"]'));
    const submitButton = element(by.css('button[type="submit"]'));

    nameInput.sendKeys('John Doe');
    emailInput.sendKeys('john@example.com');
    passwordInput.sendKeys('password');
    confirmPasswordInput.sendKeys('password');
    addressInput.sendKeys('123 Street, City');

    submitButton.click();

    // Expectations after successful registration
    expect(browser.getCurrentUrl()).toContain('/dashboard'); // Assuming successful registration redirects to the dashboard
    // You can add further expectations like checking for success message or user details displayed after registration
  });

  // Add more tests as needed...
});
