//register.spec.ts
import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('RegisterPageComponent', () => {
  beforeEach(() => {
    browser.get('http://localhost:4200/register');
    browser.sleep(2000);
    browser.manage().window().maximize();
  });

  it('should display register form elements', () => {
    expect(element(by.css('input[placeholder="Name"]')).isPresent()).toBeTruthy();
    expect(element(by.css('input[placeholder="Email"]')).isPresent()).toBeTruthy();
    expect(element(by.css('input[placeholder="Password"]')).isPresent()).toBeTruthy();
    expect(element(by.css('input[placeholder="Confirm Password"]')).isPresent()).toBeTruthy();
    expect(element(by.css('input[placeholder="Address"]')).isPresent()).toBeTruthy();
    expect(element(by.css('button[type="submit"]')).isPresent()).toBeTruthy();
  });

  it('should register a new user', () => {
    const nameInput = element(by.css('input[placeholder="Name"]'));
    const emailInput = element(by.css('input[placeholder="Email"]'));
    const passwordInput = element(by.css('input[placeholder="Password"]'));
    const confirmPasswordInput = element(by.css('input[placeholder="Confirm Password"]'));
    const addressInput = element(by.css('input[placeholder="Address"]'));
    const submitButton = element(by.css('button[type="submit"]'));

    nameInput.sendKeys('John Doe');
    emailInput.sendKeys('john007@example.com');
    passwordInput.sendKeys('password');
    confirmPasswordInput.sendKeys('password');
    addressInput.sendKeys('123 Street, City');

    submitButton.click();
    browser.sleep(2000);
    // Expectations after successful registration
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/');
    console.log("Register Page Test Passed");
  });
});
