import { LoginPage } from '../pagesCypress/LoginPage';
import { RegisterPage } from '../pagesCypress/RegisterPage';

const loginPage = new LoginPage();
const registerPage = new RegisterPage();
const appUrl = 'http://localhost:4200';

/**
 * Create a unique test user via UI and store in Cypress.env
 */
function createAndRegisterUser() {
  const timestamp = Date.now();
  const user = {
    email: `testuser_${timestamp}@example.com`,
    password: 'password',
    name: 'John Doe',
    address: '123 Test Lane'
  };

  // Register the user
  registerPage.visitRegister();
  registerPage.fillForm(user.name, user.email, user.password, user.address);
  registerPage.submitForm();
  registerPage.verifyRedirectToHome();

  // Store in Cypress.env for later use
  Cypress.env('testName', user.name);
  Cypress.env('testAddress', user.address);
  Cypress.env('testEmail', user.email);
  Cypress.env('testPassword', user.password);

  return user;
}

/**
 * Retrieve the test user from Cypress.env or create/register a new one
 */
function getTestUser() {
  const email = Cypress.env('testEmail');
  const password = Cypress.env('testPassword');
  const name = Cypress.env('testName');
  const address = Cypress.env('testAddress');

  if (email && password && name && address) {
    return { email, password, name, address };
  }
  return createAndRegisterUser();
}

/**
 * Log in using Cypress session (runs once per session)
 */
export function loginWithSession() {
  const user = getTestUser();

  cy.session([user.email, user.password], () => {
    loginPage.login(user.email, user.password);
    cy.url({ timeout: 10000 }).should('not.include', '/login');
  });

  cy.visit(appUrl); // start each test from homepage
}
