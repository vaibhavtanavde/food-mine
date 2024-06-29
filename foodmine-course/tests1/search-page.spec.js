"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
describe('Test Suite', function () {
    beforeEach(function () {
        protractor_1.browser.sleep(2000);
        protractor_1.browser.manage().window().maximize();
    });
    it('should be able to search for food', function () {
        var item = (0, protractor_1.element)(protractor_1.by.css('input[placeholder="Lets Go"]'));
        item.sendKeys("xyz");
        var Search = (0, protractor_1.element)(protractor_1.by.css('button[_ngcontent-ng-c1648554281]'));
        Search.click();
        protractor_1.browser.sleep(3000);
        var resetLinkText = (0, protractor_1.element)(protractor_1.by.linkText('Reset Search')).click();
        protractor_1.browser.sleep(3000);
        item.clear();
        item.sendKeys("Meatball");
        var itemValue = item.getAttribute('value');
        console.log('Item value:', itemValue);
        Search.click();
        protractor_1.browser.sleep(3000);
        var expectedUrl = "http://localhost:4200/search/".concat(itemValue);
        console.log('Waiting for URL to contain', expectedUrl);
        protractor_1.browser.wait(protractor_1.ExpectedConditions.urlContains("/search/".concat(itemValue)), 10000, "URL did not change to /search/".concat(itemValue));
        var currentUrl = protractor_1.browser.getCurrentUrl();
        expect(currentUrl).toContain(expectedUrl);
    });
    it('should navigate to Home page', function () {
        var FoodMine = (0, protractor_1.element)(protractor_1.by.css('a.logo[routerlink="/"]')).click();
        expect(protractor_1.browser.getCurrentUrl()).toContain('http://localhost:4200/');
    });
});
