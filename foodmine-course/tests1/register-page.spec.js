"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
describe('Test Suite', () => {
    beforeEach(() => {
        protractor_1.browser.sleep(3000);
    });
    it('should display register form elements', () => {
        expect((0, protractor_1.element)(protractor_1.by.css('input[placeholder="Name"]')).isPresent()).toBeTruthy();
        expect((0, protractor_1.element)(protractor_1.by.css('input[placeholder="Email"]')).isPresent()).toBeTruthy();
        expect((0, protractor_1.element)(protractor_1.by.css('input[placeholder="Password"]')).isPresent()).toBeTruthy();
        expect((0, protractor_1.element)(protractor_1.by.css('input[placeholder="Confirm Password"]')).isPresent()).toBeTruthy();
        expect((0, protractor_1.element)(protractor_1.by.css('input[placeholder="Address"]')).isPresent()).toBeTruthy();
        expect((0, protractor_1.element)(protractor_1.by.css('button[type="submit"]')).isPresent()).toBeTruthy();
    });
    it('should register a new user', () => {
        const Name = (0, protractor_1.element)(protractor_1.by.css('input[placeholder="Name"]')).sendKeys('John Doe');
        const Email = (0, protractor_1.element)(protractor_1.by.css('input[placeholder="Email"]')).sendKeys('payal70@example.com');
        const Password = (0, protractor_1.element)(protractor_1.by.css('input[placeholder="Password"]')).sendKeys('password');
        const ConfirmPassword = (0, protractor_1.element)(protractor_1.by.css('input[placeholder="Confirm Password"]')).sendKeys('password');
        const Address = (0, protractor_1.element)(protractor_1.by.css('input[placeholder="Address"]')).sendKeys('123 Street, City');
        const Register = (0, protractor_1.element)(protractor_1.by.css('button[type="submit"]')).click();
        protractor_1.browser.sleep(2000);
        expect(protractor_1.browser.getCurrentUrl()).toContain('http://localhost:4200/');
    });
});
