// cypress/pagesCypress/SearchPage.js
export class SearchPage {
  visitHome() {
    
    cy.visit('http://localhost:4200');
  }

  getSearchInput() {
    return cy.get('input[placeholder="Lets Go"]');
  }

  getSearchButton() {
    return cy.contains('button', 'Search');
  }

  getResetLink() {
    return cy.contains('a', 'Reset Search');
  }

  getLogo() {
    return cy.get('a.logo[routerlink="/"]');
  }

  enterSearchTerm(term) {
    this.getSearchInput().type(term);
  }

  clickSearch() {
    this.getSearchButton().click();
  }

  clickReset() {
    this.getResetLink().click();
  }

  clearSearch() {
    this.getSearchInput().clear();
  }

  clickLogo() {
    this.getLogo().click();
  }

  verifyUrlContains(substring) {
    cy.url().should('include', substring);
  }

  verifyExactUrl(url) {
    cy.url().should('eq', url);
  }
}