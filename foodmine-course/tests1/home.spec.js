"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules
var protractor_1 = require("protractor");
describe('HomeComponent', function () {
    beforeEach(function () {
        // Navigate to the home page
        //browser.get('http://localhost:4200/');
        protractor_1.browser.sleep(2000);
        protractor_1.browser.manage().window().maximize();
    });
    it('should display home form elements', function () {
        expect((0, protractor_1.element)(protractor_1.by.css('input[placeholder="Search Food Mine!"]')).isPresent()).toBeTruthy();
        expect((0, protractor_1.element)(protractor_1.by.css('button[_ngcontent-ng-c882576285]')).isPresent()).toBeTruthy();
        expect((0, protractor_1.element)(protractor_1.by.css('a.logo[routerlink="/"]')).isPresent()).toBeTruthy();
    });
    it('should display vegeterian foods filtered by search term', function () {
        // Simulate navigating to the home page with a search term
        var searchItem = (0, protractor_1.element)(protractor_1.by.css('input[placeholder="Search Food Mine!"]'));
        var searchButton = (0, protractor_1.element)(protractor_1.by.css('button[_ngcontent-ng-c882576285]')); // Search Button
        var homeButton = (0, protractor_1.element)(protractor_1.by.css('a.logo[routerlink="/"]'));
        searchItem.sendKeys("Pizza");
        searchButton.click();
        homeButton.click();
        protractor_1.browser.sleep(2000);
        expect(protractor_1.browser.getCurrentUrl()).toContain('http://localhost:4200/');
    });
    it('should display meat foods filtered by search term', function () {
        var searchItem = (0, protractor_1.element)(protractor_1.by.css('input[placeholder="Search Food Mine!"]'));
        var searchButton = (0, protractor_1.element)(protractor_1.by.css('button[_ngcontent-ng-c882576285]')); //
        var homeButton = (0, protractor_1.element)(protractor_1.by.css('a.logo[routerlink="/"]'));
        homeButton.click();
        searchItem.sendKeys("Meatball");
        searchButton.click(); // Search Button
        protractor_1.browser.sleep(2000);
        homeButton.click();
        expect(protractor_1.browser.getCurrentUrl()).toContain('http://localhost:4200/');
        console.log("Home Page Test Passed");
    });
});
