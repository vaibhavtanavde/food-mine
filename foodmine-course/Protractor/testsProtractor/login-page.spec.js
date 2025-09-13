const loginPage = require('../pagesProtractor/login-page');

describe('Login Page Tests', () => {
  it('Verify user should be able to navigate to login page', async () => {
    await loginPage.navigateToHome();
    await loginPage.clickLogin();
    expect(await loginPage.getCurrentUrl()).toContain('/login');
  });

});
