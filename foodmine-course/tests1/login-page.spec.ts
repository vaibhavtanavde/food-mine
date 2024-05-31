//register.spec.ts
import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('LoginPageComponent', () => {
  beforeEach(() => {
    browser.get('http://localhost:4200');
    browser.sleep(2000);
    browser.manage().window().maximize();
  });

  it('should display Login form', () => {
     const Login = element(by.css('a[routerlink="/login"]'));
     const RegisterHere = element(by.css('a[routerlink="/register'));
     Login.click();
     RegisterHere.click();
     expect(browser.getCurrentUrl()).toContain('http://localhost:4200/register');
     console.log("Login Page Test Passed")
  });
});
