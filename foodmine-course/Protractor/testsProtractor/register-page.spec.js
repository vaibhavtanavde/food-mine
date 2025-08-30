const registerPage = require('../pagesProtractor/register-page');

describe('Register Page Tests', () => {
  it('Verify user should be able to display all register form fields and successfully login', async () => {
    const elementsPresence = await registerPage.isFormDisplayed();
    elementsPresence.forEach(present => expect(present).toBe(true));
    const email = browser.params.testEmail;
    const name = browser.params.testName;
    const address = browser.params.testAddress;
    await registerPage.registerUser(name, email, 'password', address);
    expect(await registerPage.getCurrentUrl()).toContain('/');
  });

});