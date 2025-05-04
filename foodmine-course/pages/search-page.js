const { browser, by, element, ExpectedConditions: EC } = require('protractor');

class SearchPage {
  constructor() {
    this.searchInput = element(by.css('input[placeholder="Lets Go"]'));
    this.searchButton = element(by.buttonText('Search'));
    this.resetLink = element(by.linkText('Reset Search'));
    this.logo = element(by.css('a.logo[routerlink="/"]'));
  }

  async enterSearchTerm(term) {
    await this.searchInput.sendKeys(term);
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async clickReset() {
    await this.resetLink.click();
  }

  async clearSearch() {
    await this.searchInput.clear();
  }

  async waitForUrlContains(substring) {
    await browser.wait(EC.urlContains(substring), 10000, `URL did not contain ${substring}`);
  }

  async getCurrentUrl() {
    return await browser.getCurrentUrl();
  }

  async clickLogo() {
    await this.logo.click();
  }
}

module.exports = new SearchPage();