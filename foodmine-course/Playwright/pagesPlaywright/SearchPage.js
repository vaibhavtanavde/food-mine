export class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchInput = 'input[placeholder="Lets Go"]';
    this.searchButton = 'button:has-text("Search")';
    this.resetLink = 'a:has-text("Reset Search")';
    this.logo = 'a.logo[routerlink="/"]';
  }

  async visitHome() {
    await this.page.goto('http://localhost:4200');
  }

  async enterSearchTerm(term) {
    await this.page.fill(this.searchInput, term);
  }

  async clickSearch() {
    await this.page.click(this.searchButton);
  }

  async clickReset() {
    await this.page.click(this.resetLink);
  }

  async clearSearch() {
    await this.page.fill(this.searchInput, '');
  }

  async clickLogo() {
    await this.page.click(this.logo);
  }

  async verifyUrlContains(substring) {
    await this.page.waitForURL(`**${substring}**`);
  }

  async verifyExactUrl(url) {
    await this.page.waitForURL(url);
  }
}
