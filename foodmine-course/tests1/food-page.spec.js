"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules
var protractor_1 = require("protractor");
describe('FoodPageComponent', function () {
    beforeEach(function () {
        protractor_1.browser.manage().window().maximize();
    });
    it('should add item to cart', function () {
        var item = (0, protractor_1.element)(protractor_1.by.css('input[placeholder="Search Food Mine!"]'));
        protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(item), 5000); // Wait until the input is visible
        item.sendKeys("Meatball");
        item.getAttribute('value').then(function (itemValue) {
            var Search = (0, protractor_1.element)(protractor_1.by.css('button[_ngcontent-ng-c882576285]'));
            protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(Search), 5000); // Wait until the button is clickable
            Search.click();
            var foodname = (0, protractor_1.element)(protractor_1.by.css('img[src="assets/food-2.jpg"]'));
            protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(foodname), 5000); // Wait until the image is clickable
            foodname.click();
            var AddToCart = (0, protractor_1.element)(protractor_1.by.css('button[_ngcontent-ng-c4203585026]'));
            protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(AddToCart), 5000); // Wait until the button is clickable
            AddToCart.click();
            protractor_1.browser.wait(protractor_1.ExpectedConditions.urlContains('http://localhost:4200/cart-page'), 5000); // Wait for URL to change
        });
    });
});
