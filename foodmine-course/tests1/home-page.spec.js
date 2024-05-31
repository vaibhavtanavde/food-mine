"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//home.spec.ts
var protractor_1 = require("protractor");
describe('HomeComponent', function () {
    beforeEach(function () {
        protractor_1.browser.sleep(2000);
        protractor_1.browser.manage().window().maximize();
    });
    it('should display home form elements', function () {
        var foodname = (0, protractor_1.element)(protractor_1.by.css('img[src="assets/food-1.jpg"]'));
        foodname.click();
        protractor_1.browser.sleep(2000);
        var AddToCart = (0, protractor_1.element)(protractor_1.by.css('button[_ngcontent-ng-c4203585026]'));
        AddToCart.click();
        protractor_1.browser.sleep(2000);
        var Remove = (0, protractor_1.element)(protractor_1.by.css('button[_ngcontent-ng-c471533846]'));
        Remove.click();
        protractor_1.browser.sleep(2000);
        var FoodMine = (0, protractor_1.element)(protractor_1.by.css('a.logo[routerlink="/"]'));
        FoodMine.click();
    });
});
