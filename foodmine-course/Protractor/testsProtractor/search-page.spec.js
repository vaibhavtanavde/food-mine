const searchPage = require('../pagesProtractor/search-page');

describe('Search Page Tests', () => {
  beforeEach(async () => {
    await browser.manage().window().maximize();
  });

  it('Verify user should be able to search for food and navigate to correct URL', async () => {
    const firstTerm = 'xyz';
    await searchPage.enterSearchTerm(firstTerm);
    await searchPage.clickSearch();
    await searchPage.clickReset();
    await searchPage.clearSearch();

    const secondTerm = 'Meatball';
    await searchPage.enterSearchTerm(secondTerm);
    await searchPage.clickSearch();
    await searchPage.waitForUrlContains(`/search/${secondTerm}`);
    const currentUrl = await searchPage.getCurrentUrl();
    expect(currentUrl).toContain(`http://localhost:4200/search/${secondTerm}`);
  });

   it('Verify user should navigate to home page when clicking logo', async () => {
    await searchPage.clickLogo();
    const url = await searchPage.getCurrentUrl();
    expect(url).toContain('http://localhost:4200/');
  });
});