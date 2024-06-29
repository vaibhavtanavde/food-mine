import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('Test Suite', () => {
  beforeEach(() => {
    browser.sleep(3000);
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
    const Name = element(by.css('input[placeholder="Name"]')).sendKeys('John Doe');
    const Email = element(by.css('input[placeholder="Email"]')).sendKeys('payal16@example.com');
    const Password = element(by.css('input[placeholder="Password"]')).sendKeys('password');
    const ConfirmPassword = element(by.css('input[placeholder="Confirm Password"]')).sendKeys('password');
    const Address = element(by.css('input[placeholder="Address"]')).sendKeys('123 Street, City');
    const Register = element(by.css('button[type="submit"]')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/');
  });
});
