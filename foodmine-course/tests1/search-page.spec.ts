import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('Test Suite', () => {
  beforeEach(() => {
    browser.sleep(2000);
    browser.manage().window().maximize();
  });

  it('should be able to search for food', () => {
    const item = element(by.css('input[placeholder="Lets Go"]'));
    item.sendKeys("xyz");
    const Search = element(by.css('button[_ngcontent-ng-c1648554281]'));
    Search.click();
    browser.sleep(3000);
    const resetLinkText = element(by.linkText('Reset Search')).click();
    browser.sleep(3000);
    item.clear();
    item.sendKeys("Meatball");
    const itemValue = item.getAttribute('value');
    console.log('Item value:', itemValue);
    Search.click();
    browser.sleep(3000);
    const expectedUrl = `http://localhost:4200/search/${itemValue}`;
    console.log('Waiting for URL to contain', expectedUrl);
    browser.wait(EC.urlContains(`/search/${itemValue}`), 10000, `URL did not change to /search/${itemValue}`);
    const currentUrl = browser.getCurrentUrl();
    expect(currentUrl).toContain(expectedUrl);
});

  it('should navigate to Home page', () => {
    const FoodMine = element(by.css('a.logo[routerlink="/"]')).click();
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/');
  });
});
