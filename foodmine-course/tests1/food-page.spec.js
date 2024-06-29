"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules
const protractor_1 = require("protractor");
describe('Test Suite', () => {
    beforeEach(() => {
        protractor_1.browser.manage().window().maximize();
    });
    it('should add food item to cart', () => {
        const item = (0, protractor_1.element)(protractor_1.by.css('input[placeholder="Lets Go"]'));
        protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(item), 5000); // Wait until the input is visible
        item.sendKeys("Meatball");
        item.getAttribute('value').then((itemValue) => {
            protractor_1.browser.sleep(2000);
            const Search = (0, protractor_1.element)(protractor_1.by.css('button[_ngcontent-ng-c1648554281]'));
            Search.click();
            protractor_1.browser.sleep(2000);
            const foodname = (0, protractor_1.element)(protractor_1.by.css('img[src="assets/food-2.jpg"]')).click();
            protractor_1.browser.sleep(2000);
            const AddToCart = (0, protractor_1.element)(protractor_1.by.css('button[_ngcontent-ng-c4203585026]')).click();
            protractor_1.browser.sleep(2000);
            protractor_1.browser.wait(protractor_1.ExpectedConditions.urlContains('http://localhost:4200/cart-page'), 5000);
            expect(protractor_1.browser.getCurrentUrl()).toContain('http://localhost:4200/cart-page');
        });
    });
});
