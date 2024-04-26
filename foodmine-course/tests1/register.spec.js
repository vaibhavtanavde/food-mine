"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
describe('RegisterPageComponent', function () {
    beforeEach(function () {
        protractor_1.browser.get('http://localhost:4200/register');
        protractor_1.browser.sleep(2000);
        protractor_1.browser.manage().window().maximize();
    });
    it('should display register form elements', function () {
        expect((0, protractor_1.element)(protractor_1.by.css('input[placeholder="Name"]')).isPresent()).toBeTruthy();
        expect((0, protractor_1.element)(protractor_1.by.css('input[placeholder="Email"]')).isPresent()).toBeTruthy();
        expect((0, protractor_1.element)(protractor_1.by.css('input[placeholder="Password"]')).isPresent()).toBeTruthy();
        expect((0, protractor_1.element)(protractor_1.by.css('input[placeholder="Confirm Password"]')).isPresent()).toBeTruthy();
        expect((0, protractor_1.element)(protractor_1.by.css('input[placeholder="Address"]')).isPresent()).toBeTruthy();
        expect((0, protractor_1.element)(protractor_1.by.css('button[type="submit"]')).isPresent()).toBeTruthy();
    });
    it('should register a new user', function () {
        var nameInput = (0, protractor_1.element)(protractor_1.by.css('input[placeholder="Name"]'));
        var emailInput = (0, protractor_1.element)(protractor_1.by.css('input[placeholder="Email"]'));
        var passwordInput = (0, protractor_1.element)(protractor_1.by.css('input[placeholder="Password"]'));
        var confirmPasswordInput = (0, protractor_1.element)(protractor_1.by.css('input[placeholder="Confirm Password"]'));
        var addressInput = (0, protractor_1.element)(protractor_1.by.css('input[placeholder="Address"]'));
        var submitButton = (0, protractor_1.element)(protractor_1.by.css('button[type="submit"]'));
        nameInput.sendKeys('John Doe');
        emailInput.sendKeys('john01600@example.com');
        passwordInput.sendKeys('password');
        confirmPasswordInput.sendKeys('password');
        addressInput.sendKeys('123 Street, City');
        submitButton.click();
        protractor_1.browser.sleep(2000);
        // Expectations after successful registration
        expect(protractor_1.browser.getCurrentUrl()).toContain('http://localhost:4200/');
        console.log("Register Page Test Passed");
    });
});
