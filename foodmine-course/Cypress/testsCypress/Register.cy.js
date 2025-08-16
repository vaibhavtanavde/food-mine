import { RegisterPage } from '../pagesCypress/RegisterPage';

const registerPage = new RegisterPage();

describe('Register Page Tests', () => {
  beforeEach(() => {
    registerPage.visitRegister();
  });

  it('should display all register form fields', () => {
    registerPage.getNameInput().should('exist');
    registerPage.getEmailInput().should('exist');
    registerPage.getPasswordInput().should('exist');
    registerPage.getConfirmPasswordInput().should('exist');
    registerPage.getAddressInput().should('exist');
    registerPage.getSubmitButton().should('exist');
  });

  it('should register a new user successfully', () => {
    const name = Cypress.env('testName');
    const email = Cypress.env('testEmail');
    const password = Cypress.env('testPassword');
    const address = Cypress.env('testAddress');
  
    registerPage.fillForm(name, email, password, address);
    registerPage.submitForm();
    registerPage.verifyRedirectToHome();
  });
});