export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.nameInput = 'input[placeholder="Name"]';
    this.emailInput = 'input[placeholder="Email"]';
    this.passwordInput = 'input[placeholder="Password"]';
    this.confirmPasswordInput = 'input[placeholder="Confirm Password"]';
    this.addressInput = 'input[placeholder="Address"]';
    this.submitButton = 'button[type="submit"]';
  }

  async visitRegister() {
    await this.page.goto('http://localhost:4200/register');
  }

  async fillForm(name, email, password, address) {
    await this.page.fill(this.nameInput, name);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.fill(this.confirmPasswordInput, password);
    await this.page.fill(this.addressInput, address);
  }

  async submitForm() {
    await this.page.locator(this.submitButton).click();
  }

  async verifyRedirectToHome() {
    await this.page.waitForURL('http://localhost:4200/');
  }
}
