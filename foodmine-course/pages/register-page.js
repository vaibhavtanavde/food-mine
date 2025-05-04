const { browser, by, element } = require('protractor');

class RegisterPage {
  constructor() {
    this.nameInput = element(by.css('input[placeholder="Name"]'));
    this.emailInput = element(by.css('input[placeholder="Email"]'));
    this.passwordInput = element(by.css('input[placeholder="Password"]'));
    this.confirmPasswordInput = element(by.css('input[placeholder="Confirm Password"]'));
    this.addressInput = element(by.css('input[placeholder="Address"]'));
    this.submitButton = element(by.css('button[type="submit"]'));
  }

  async isFormDisplayed() {
    return Promise.all([
      this.nameInput.isPresent(),
      this.emailInput.isPresent(),
      this.passwordInput.isPresent(),
      this.confirmPasswordInput.isPresent(),
      this.addressInput.isPresent(),
      this.submitButton.isPresent()
    ]);
  }

  async registerUser(name, email, password, address) {
    await this.nameInput.sendKeys(name);
    await this.emailInput.sendKeys(email);
    await this.passwordInput.sendKeys(password);
    await this.confirmPasswordInput.sendKeys(password);
    await this.addressInput.sendKeys(address);
    await this.submitButton.click();
  }

  async getCurrentUrl() {
    return await browser.getCurrentUrl();
  }
}

module.exports = new RegisterPage();