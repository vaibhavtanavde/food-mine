export class LoginPage {
  visitHome() {
    cy.visit('http://localhost:4200');
  }

  clickLogin() {
    cy.get('a[routerlink="/login"]').should('be.visible').click();
  }

  clickRegister() {
    cy.contains('a', 'Register').should('be.visible').click();
  }

  verifyUrlContains(path) {
    cy.url().should('include', path);
  }

  enterEmail() {
    return cy.get('input[placeholder="Email"]');
  }

  enterPassword() {
    return cy.get('input[placeholder="Password"]');
  }

  clickSubmit() {
    return cy.get('button[type="submit"]').click();
  }

  fillLoginCredentials(email, password) {
    this.enterEmail().type(email, { force: true });
    this.enterPassword().type(password, { force: true });
  }

  login(email, password) {
    this.visitHome();
    this.clickLogin();
    this.fillLoginCredentials(email, password);
    this.clickSubmit();
  }
}
