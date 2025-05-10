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
    const email = Cypress.env('testEmail');
    registerPage.fillForm(
      'John Doe',
       email,
      'password',
      '123 Street, City'
    );
    registerPage.submitForm();
    registerPage.verifyRedirectToHome();
  });
});