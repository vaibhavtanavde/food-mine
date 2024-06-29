import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('Test Suite', () => {

  it('should click on Login button', () => {
    browser.sleep(3000);
    browser.get('http://localhost:4200');
    browser.manage().window().maximize();
    const Login = element(by.css('a[routerlink="/login"]')).click();
    browser.sleep(3000);
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/login');
  });

  it('should click on Register button', () => {
    const RegisterHere = element(by.css('a[routerlink="/register"]')).click();
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/register');
 });
});
