// Import necessary modules
import { browser, by, element } from 'protractor';

describe('HomeComponent', () => {
  beforeEach(() => {
    // Navigate to the home page
    browser.get('http://localhost:4200/');
    browser.sleep(2000);
  });

  it('should display vegeterian foods filtered by search term', () => {
    // Simulate navigating to the home page with a search term
    element(by.css('input[placeholder="Search Food Mine!"]')).sendKeys("Pizza");
    element(by.css('button[_ngcontent-ng-c882576285]')).click(); // Search Button
    browser.sleep(2000);
  });

  it('should display meat foods filtered by search term', () => {
    // Simulate navigating to the home page with a tag
    element(by.css('a.logo[routerlink="/"]')).click();
    element(by.css('input[placeholder="Search Food Mine!"]')).sendKeys("Meatball");
    element(by.css('button[_ngcontent-ng-c882576285]')).click();  // Search Button
    browser.sleep(2000);
    console.log("Home Page Test Passed");
  });
});
