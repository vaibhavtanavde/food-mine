const { browser, by, element } = require('protractor');

class RegisterPage {
  constructor() {
    this.nameInput = element(by.css('input[placeholder="Name"]'));
    this.emailInput = element(by.css('input[placeholder="Email"]'));
    this.passwordInput = element(by.css('input[placeholder="Password"]'));
    this.confirmPasswordInput = element(by.css('input[placeholder="Confirm Password"]'));
    this.addressInput = element(by.css('input[placeholder="Address"]'));
    this.submitButton = element(by.css('button[type="submit"]'));
    this.successmessage = element(by.css('div[aria-label="Register Successful"]'));
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

  async sucessToast() {
  const EC = protractor.ExpectedConditions;
  await browser.wait(EC.visibilityOf(this.successmessage), 10000);
  return await this.successmessage.isDisplayed();
  }
}

module.exports = new RegisterPage();