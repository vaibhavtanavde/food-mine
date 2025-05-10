const registerPage = require('../pagesProtractor/register-page');

describe('Register Page Tests', () => {
  it('Verify user should be able to display all register form fields', async () => {
    const elementsPresence = await registerPage.isFormDisplayed();
    elementsPresence.forEach(present => expect(present).toBe(true));
  });

  it('Verify user should be able to register a new user successfully', async () => {
    const email = browser.params.testEmail;
    await registerPage.registerUser('John Doe', email, 'password', '123 Street, City');
    expect(await registerPage.getCurrentUrl()).toContain('/');
  });
});