export class RegisterPage {
  visitRegister() {
    cy.visit('http://localhost:4200/register');
  }

  getNameInput() {
    return cy.get('input[placeholder="Name"]');
  }

  getEmailInput() {
    return cy.get('input[placeholder="Email"]');
  }

  getPasswordInput() {
    return cy.get('input[placeholder="Password"]');
  }

  getConfirmPasswordInput() {
    return cy.get('input[placeholder="Confirm Password"]');
  }

  getAddressInput() {
    return cy.get('input[placeholder="Address"]');
  }

  getSubmitButton() {
    return cy.get('button[type="submit"]');
  }

fillForm(name, email, password, address) {
  this.getNameInput().type(name, { force: true });
  this.getEmailInput().type(email, { force: true });
  this.getPasswordInput().type(password, { force: true });
  this.getConfirmPasswordInput().type(password, { force: true });
  this.getAddressInput().type(address, { force: true });
}

  submitForm() {
    this.getSubmitButton().should('be.visible').click();
  }

  verifyRedirectToHome() {
    cy.url().should('eq', 'http://localhost:4200/');
  }
}