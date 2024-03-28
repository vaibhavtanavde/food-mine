// register.spec.js - Protractor test case for register functionality

const registerPage = require('../register');

describe('Register functionality', () => {
    it('should register a new user', () => {
        // Mocking user input
        const username = 'newuser';
        const password = 'newpassword';

        // Calling the register function from register.js
        const registrationSuccessful = registerPage.register(username, password);

        // Asserting registration success
        expect(registrationSuccessful).toBe(true);
    });
});
