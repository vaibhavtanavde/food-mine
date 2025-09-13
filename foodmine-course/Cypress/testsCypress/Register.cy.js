import { RegisterPage } from '../pagesCypress/RegisterPage';
import { loginWithSession } from '../utils/sessionManager';

const registerPage = new RegisterPage();

describe('Register Page Tests', () => {
  beforeEach(() => {
    registerPage.visitRegister();
  });

  it('Verify user should be able to display all register form fields and successfully login', () => { 
    registerPage.getNameInput().should('exist');
    registerPage.getEmailInput().should('exist');
    registerPage.getPasswordInput().should('exist');
    registerPage.getConfirmPasswordInput().should('exist');
    registerPage.getAddressInput().should('exist');
    registerPage.getSubmitButton().should('exist');
    loginWithSession()
  });

});