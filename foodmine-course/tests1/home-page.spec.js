"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//home-page.spec.ts
const protractor_1 = require("protractor");
describe('Test Suite', () => {
    beforeEach(() => {
        protractor_1.browser.sleep(2000);
    });
    it('should add food item to cart and then remove it', () => {
        const foodname = (0, protractor_1.element)(protractor_1.by.css('img[src="assets/food-1.jpg"]')).click();
        protractor_1.browser.sleep(2000);
        const AddToCart = (0, protractor_1.element)(protractor_1.by.css('button[_ngcontent-ng-c4203585026]')).click();
        protractor_1.browser.sleep(2000);
        const Remove = (0, protractor_1.element)(protractor_1.by.css('button[_ngcontent-ng-c471533846]')).click();
        protractor_1.browser.sleep(2000);
        expect(protractor_1.browser.getCurrentUrl()).toContain('http://localhost:4200/cart-page');
    });
    it('should navigate back to home page', () => {
        const FoodMine = (0, protractor_1.element)(protractor_1.by.css('a.logo[routerlink="/"]')).click();
        expect(protractor_1.browser.getCurrentUrl()).toContain('http://localhost:4200/');
    });
});
