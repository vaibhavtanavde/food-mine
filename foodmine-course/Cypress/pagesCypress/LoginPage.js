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

  clickSubmit(){
    return cy.get('button[type="submit"]').click()
  }
 
  fillloginCredentials(email, password) {
     this.enterEmail().type(email, { force: true });
     this.enterPassword().type(password, { force: true });
  }

  login(email, password){
    cy.visit('http://localhost:4200');
    cy.get('a[routerlink="/login"]').should('be.visible').click();
    cy.get('input[placeholder="Email"]').type(email, { force: true });
    cy.get('input[placeholder="Password"]').type(password, { force: true });
    cy.get('button[type="submit"]').click()
  }

  loginSession(email, password) {
    cy.session([email, password], () => {
      this.visitHome();
      this.clickLogin();
      this.fillloginCredentials(email, password);
      this.clickSubmit();
      cy.url().should('not.include', '/login');
    });
    cy.visit('http://localhost:4200');
  }

}