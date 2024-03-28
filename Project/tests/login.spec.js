// login.spec.js - Protractor test case for login functionality

const loginPage = require('../login');

describe('Login functionality', () => {
    it('should login with correct credentials', () => {
        // Mocking user input
        const username = 'exampleuser';
        const password = 'password';

        // Calling the login function from login.js
        const loginSuccessful = loginPage.login(username, password);

        // Asserting login success
        expect(loginSuccessful).toBe(true);
    });

    it('should fail to login with incorrect credentials', () => {
        // Mocking user input
        const username = 'invaliduser';
        const password = 'invalidpassword';

        // Calling the login function from login.js
        const loginSuccessful = loginPage.login(username, password);

        // Asserting login failure
        expect(loginSuccessful).toBe(false);
    });
});
