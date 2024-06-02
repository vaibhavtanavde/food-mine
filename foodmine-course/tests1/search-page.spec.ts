import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('Test Suite', () => {
  beforeEach(() => {
    browser.sleep(2000);
    browser.manage().window().maximize();
  });

  it('should be able to search for food', () => {
    const item = element(by.css('input[placeholder="Lets Go"]'));
    item.sendKeys("xyz");
    const resetLinkText = element(by.linkText('Reset Search')).click();
    browser.sleep(2000);
    item.sendKeys("Meatball");
    const itemValue = item.getAttribute('value');
    const Search = element(by.css('button[_ngcontent-ng-c882576285]')).click();
    browser.sleep(2000);
});

  it('should navigate to Home page', () => {
    const FoodMine = element(by.css('a.logo[routerlink="/"]')).click();
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/');
  });
});
