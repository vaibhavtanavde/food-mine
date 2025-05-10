const { browser, by, element } = require('protractor');

class LoginPage {
  constructor() {
    this.loginLink = element(by.css('a[routerlink="/login"]'));
    this.registerLink = element(by.css('a[routerlink="/register"]'));
  }

  async navigateToHome() {
    await browser.get('http://localhost:4200');
    await browser.manage().window().maximize();
  }

  async clickLogin() {
    await this.loginLink.click();
  }

  async clickRegister() {
    await this.registerLink.click();
  }

  async getCurrentUrl() {
    return await browser.getCurrentUrl();
  }
}

module.exports = new LoginPage();