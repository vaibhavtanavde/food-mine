import { SearchPage } from '../pagesCypress/SearchPage';

const searchPage = new SearchPage();

describe('Search Page Tests', () => {
  beforeEach(() => {
    searchPage.visitHome();
    cy.viewport(1280, 720);
  });

  it('should search for food and navigate to correct URL', () => {
    const firstTerm = 'xyz';
    searchPage.enterSearchTerm(firstTerm);
    searchPage.clickSearch();
    searchPage.clickReset();
    searchPage.clearSearch();

    const secondTerm = 'Meatball';
    searchPage.enterSearchTerm(secondTerm);
    searchPage.clickSearch();
    searchPage.verifyUrlContains(`/search/${secondTerm}`);
    searchPage.verifyExactUrl(`http://localhost:4200/search/${secondTerm}`);
  });

  it('should navigate to home page when clicking logo', () => {
    searchPage.clickLogo();
    searchPage.verifyExactUrl('http://localhost:4200/');
  });
});