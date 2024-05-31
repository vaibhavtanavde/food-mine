"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//register.spec.ts
var protractor_1 = require("protractor");
describe('SearchPageComponent', function () {
    beforeEach(function () {
        protractor_1.browser.sleep(2000);
        protractor_1.browser.manage().window().maximize();
    });
    it('should be able to search for food', function () {
        var item = (0, protractor_1.element)(protractor_1.by.css('input[placeholder="Search Food Mine!"]'));
        item.sendKeys("Meatball");
        var itemValue = item.getAttribute('value');
        var Search = (0, protractor_1.element)(protractor_1.by.css('button[_ngcontent-ng-c882576285]'));
        Search.click();
        protractor_1.browser.sleep(2000);
        expect(protractor_1.browser.getCurrentUrl()).toContain("http://localhost:4200/search/".concat(itemValue));
    });
    it('should navigate to Home Page', function () {
        var FoodMine = (0, protractor_1.element)(protractor_1.by.css('a.logo[routerlink="/"]'));
        FoodMine.click();
        expect(protractor_1.browser.getCurrentUrl()).toContain('http://localhost:4200/');
    });
});
