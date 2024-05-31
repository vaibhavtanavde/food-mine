"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
describe('CartPageComponent', function () {
    beforeEach(function () {
        // Removed unnecessary sleep
    });
    it('should add to cart', function () {
        var cartItemfoodname = (0, protractor_1.element)(protractor_1.by.css('a[ng-reflect-router-link="/food/65957e915bbdf523e45b575e"]'));
        // Wait until the anchor is visible
        protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(cartItemfoodname), 5000).then(function () {
            // Get the text of the anchor element
            cartItemfoodname.getText().then(function (text) {
                expect(text).toBe('Meatball');
            });
            // Select quantity
            var cartItemquantity = (0, protractor_1.element)(protractor_1.by.css('select[_ngcontent-ng-c471533846]'));
            cartItemquantity.click().then(function () {
                // Wait for the dropdown options to be visible
                protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf((0, protractor_1.element)(protractor_1.by.cssContainingText('option', '3'))), 5000).then(function () {
                    // Select option
                    var option = (0, protractor_1.element)(protractor_1.by.cssContainingText('option', '3'));
                    option.click();
                    // Click on Proceed to Checkout
                    var ProceedtoCheckout = (0, protractor_1.element)(protractor_1.by.css('a[ng-reflect-router-link="/checkout"]'));
                    ProceedtoCheckout.click().then(function () {
                        // Optionally, you might want to wait for the checkout page to load
                        protractor_1.browser.wait(protractor_1.ExpectedConditions.urlContains('/checkout'), 5000);
                    });
                });
            });
        });
    });
});
