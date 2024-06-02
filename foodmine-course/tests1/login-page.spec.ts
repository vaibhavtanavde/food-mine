import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('Test Suite', () => {
  beforeEach(() => {
    browser.get('http://localhost:4200');
    browser.sleep(2000);
    browser.manage().window().maximize();
  });

  it('should click on Login button', () => {
     const Login = element(by.css('a[routerlink="/login"]')).click();
  });

  it('should click on Register button', () => {
    const RegisterHere = element(by.css('a[routerlink="/register')).click();
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/register');
 });
});
