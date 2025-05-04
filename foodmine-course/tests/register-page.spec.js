const registerPage = require('../pages/register-page');

describe('Register Page Tests', () => {
  it('Verify user should be able to display all register form fields', async () => {
    const elementsPresence = await registerPage.isFormDisplayed();
    elementsPresence.forEach(present => expect(present).toBe(true));
  });

  it('Verify user should be able to register a new user successfully', async () => {
    await registerPage.registerUser('John Doe', 'payal07may@example.com', 'password', '123 Street, City');
    expect(await registerPage.getCurrentUrl()).toContain('/');
  });
});