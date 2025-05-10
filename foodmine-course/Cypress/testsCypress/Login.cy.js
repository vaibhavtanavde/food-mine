import { LoginPage } from '../pagesCypress/LoginPage';

const loginPage = new LoginPage();

describe('Login Page Tests', () => {
  beforeEach(() => {
    loginPage.visitHome();
    loginPage.clickLogin();
  });

  it('should navigate to login page', () => {
    loginPage.verifyUrlContains('/login');
  });

  it('should navigate to register page', () => {
    loginPage.clickRegister();
    loginPage.verifyUrlContains('/register');
  });
});