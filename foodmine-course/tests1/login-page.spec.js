"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//register.spec.ts
var protractor_1 = require("protractor");
describe('LoginPageComponent', function () {
    beforeEach(function () {
        protractor_1.browser.get('http://localhost:4200');
        protractor_1.browser.sleep(2000);
        protractor_1.browser.manage().window().maximize();
    });
    it('should display Login form', function () {
        var Login = (0, protractor_1.element)(protractor_1.by.css('a[routerlink="/login"]'));
        var RegisterHere = (0, protractor_1.element)(protractor_1.by.css('a[routerlink="/register'));
        Login.click();
        RegisterHere.click();
        expect(protractor_1.browser.getCurrentUrl()).toContain('http://localhost:4200/register');
        console.log("Login Page Test Passed");
    });
});
