import { test, expect } from '@playwright/test';
import { SearchPage } from '../pagesPlaywright/SearchPage';

test.describe('Search Page Tests', () => {
  let searchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.visitHome();
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('should search for food and navigate to correct URL', async () => {
    const firstTerm = 'xyz';
    await searchPage.enterSearchTerm(firstTerm);
    await searchPage.clickSearch();
    await searchPage.clickReset();
    await searchPage.clearSearch();

    const secondTerm = 'Meatball';
    await searchPage.enterSearchTerm(secondTerm);
    await searchPage.clickSearch();
    await searchPage.verifyUrlContains(`/search/${secondTerm}`);
    await searchPage.verifyExactUrl(`http://localhost:4200/search/${secondTerm}`);
  });

  test('should navigate to home page when clicking logo', async () => {
    await searchPage.clickLogo();
    await searchPage.verifyExactUrl('http://localhost:4200/');
  });
});
