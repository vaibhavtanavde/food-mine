import { browser, by, element, ElementFinder } from 'protractor';

describe('LoginPageComponent', () => {
  beforeEach(async () => {
    await browser.get('/login'); // Assuming '/login' is the route for the login page
  });

  it('should display login form', async () => {
    const loginComponent = element(by.tagName('app-login-page'));
    const emailInput = loginComponent.element(by.css('input[formControlName="email"]'));
    const passwordInput = loginComponent.element(by.css('input[formControlName="password"]'));
    const submitButton = loginComponent.element(by.css('button[type="submit"]'));

    expect(await emailInput.isPresent()).toBeTruthy();
    expect(await passwordInput.isPresent()).toBeTruthy();
    expect(await submitButton.isPresent()).toBeTruthy();
  });

  it('should require email and password', async () => {
    const submitButton = element(by.css('button[type="submit"]'));

    await submitButton.click();

    const emailError = element(by.css('div.error-email'));
    const passwordError = element(by.css('div.error-password'));

    expect(await emailError.getText()).toEqual('Email is required');
    expect(await passwordError.getText()).toEqual('Password is required');
  });

  it('should show invalid email error', async () => {
    const emailInput = element(by.css('input[formControlName="email"]'));
    const submitButton = element(by.css('button[type="submit"]'));

    await emailInput.sendKeys('invalidemail');
    await submitButton.click();

    const emailError = element(by.css('div.error-email'));

    expect(await emailError.getText()).toEqual('Invalid email');
  });

  it('should submit the form with valid credentials', async () => {
    const emailInput = element(by.css('input[formControlName="email"]'));
    const passwordInput = element(by.css('input[formControlName="password"]'));
    const submitButton = element(by.css('button[type="submit"]'));

    await emailInput.sendKeys('validemail@example.com');
    await passwordInput.sendKeys('password123');
    await submitButton.click();

    // Assuming successful login redirects to another page, you can add assertions for that
    expect(await browser.getCurrentUrl()).toContain('/dashboard');
  });
});
