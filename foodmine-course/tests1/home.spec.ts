// Import necessary modules
import { browser, by, element } from 'protractor';

describe('HomeComponent', () => {
  beforeEach(() => {
    // Navigate to the home page
    //browser.get('http://localhost:4200/');
    browser.sleep(2000);
    browser.manage().window().maximize();
  });

  it('should display home form elements', () => {
    expect(element(by.css('input[placeholder="Search Food Mine!"]')).isPresent()).toBeTruthy();
    expect(element(by.css('button[_ngcontent-ng-c882576285]')).isPresent()).toBeTruthy();
    expect(element(by.css('a.logo[routerlink="/"]')).isPresent()).toBeTruthy();
  });

  it('should display vegeterian foods filtered by search term', () => {
    // Simulate navigating to the home page with a search term
    const searchItem = element(by.css('input[placeholder="Search Food Mine!"]'));
    const searchButton = element(by.css('button[_ngcontent-ng-c882576285]')); // Search Button
    const homeButton = element(by.css('a.logo[routerlink="/"]'));

    searchItem.sendKeys("Pizza");
    searchButton.click();
    homeButton.click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/');
  });

  it('should display meat foods filtered by search term', () => {
    const searchItem = element(by.css('input[placeholder="Search Food Mine!"]'));
    const searchButton = element(by.css('button[_ngcontent-ng-c882576285]')); //
    const homeButton = element(by.css('a.logo[routerlink="/"]'));
    
    homeButton.click();
    searchItem.sendKeys("Meatball");
    searchButton.click();  // Search Button
    browser.sleep(2000);
    homeButton.click();
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/');
    console.log("Home Page Test Passed");
  });
});
