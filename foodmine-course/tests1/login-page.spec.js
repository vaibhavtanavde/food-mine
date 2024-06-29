"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
describe('Test Suite', () => {
    it('should click on Login button', () => {
        protractor_1.browser.sleep(3000);
        protractor_1.browser.get('http://localhost:4200');
        protractor_1.browser.manage().window().maximize();
        const Login = (0, protractor_1.element)(protractor_1.by.css('a[routerlink="/login"]')).click();
        protractor_1.browser.sleep(3000);
        expect(protractor_1.browser.getCurrentUrl()).toContain('http://localhost:4200/login');
    });
    it('should click on Register button', () => {
        const RegisterHere = (0, protractor_1.element)(protractor_1.by.css('a[routerlink="/register"]')).click();
        expect(protractor_1.browser.getCurrentUrl()).toContain('http://localhost:4200/register');
    });
});
