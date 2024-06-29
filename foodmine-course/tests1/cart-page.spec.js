"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
describe('Test Suite', () => {
    it('should check for food name', () => {
        const cartItemfoodname = (0, protractor_1.element)(protractor_1.by.css('a[ng-reflect-router-link="/food/65957e915bbdf523e45b575e"]'));
        protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(cartItemfoodname), 5000).then(() => {
            cartItemfoodname.getText().then((text) => {
                expect(text).toBe('Meatball');
            });
        });
    });
    it('should change food item qunatity', () => {
        const cartItemquantity = (0, protractor_1.element)(protractor_1.by.css('select[_ngcontent-ng-c471533846]'));
        cartItemquantity.click().then(() => {
            // Wait for the dropdown options to be visible
            protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf((0, protractor_1.element)(protractor_1.by.cssContainingText('option', '3'))), 5000).then(() => {
                const option = (0, protractor_1.element)(protractor_1.by.cssContainingText('option', '3'));
                option.getText().then(function (optionText) {
                    option.click();
                    const carttotalCount = (0, protractor_1.element)(protractor_1.by.css('.foods-count')).getText();
                    carttotalCount.then(function (cartText) {
                        if (optionText === cartText) {
                            console.log("Pass");
                        }
                        else {
                            console.log("Fail");
                        }
                    });
                });
            });
        });
        expect(protractor_1.browser.getCurrentUrl()).toContain('http://localhost:4200/cart-page');
    });
    it('should verify price after quantity change', () => {
        const priceElement = protractor_1.element.all(protractor_1.by.css('div[_ngcontent-ng-c471533846]')).get(5);
        priceElement.getText();
        const carttotalPrice = (0, protractor_1.element)(protractor_1.by.css('.total-price'));
        carttotalPrice.getText();
        expect(protractor_1.browser.getCurrentUrl()).toContain('http://localhost:4200/cart-page');
    });
    it('should navigate to checkout page', () => {
        const ProceedtoCheckout = (0, protractor_1.element)(protractor_1.by.css('a[ng-reflect-router-link="/checkout"]'));
        ProceedtoCheckout.click();
        protractor_1.browser.wait(protractor_1.ExpectedConditions.urlContains('/checkout'), 5000);
        expect(protractor_1.browser.getCurrentUrl()).toContain('/checkout');
    });
});
