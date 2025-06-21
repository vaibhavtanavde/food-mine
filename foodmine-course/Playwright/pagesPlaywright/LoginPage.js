export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async visitHome() {
    await this.page.goto('http://localhost:4200');
  }

  async clickLogin() {
    await this.page.click('a[routerlink="/login"]');
  }

  async clickRegister() {
    await this.page.getByRole('link', { name: 'Register' }).click();
  }

  async verifyUrlContains(path) {
    await this.page.waitForURL(`**${path}**`);
  }

  async enterEmail(email) {
    await this.page.fill('input[placeholder="Email"]', email);
  }

  async enterPassword(password) {
    await this.page.fill('input[placeholder="Password"]', password);
  }

  async clickSubmit() {
    await this.page.click('button[type="submit"]');
  }

  async fillLoginCredentials(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
  }

  async login(email, password) {
    await this.visitHome();
    await this.clickLogin();
    await this.fillLoginCredentials(email, password);
    await this.clickSubmit();
  }

  async loginSession(email, password) {
    // Simulating session (manual cache/localStorage based workaround may be needed)
    await this.login(email, password);
    await this.page.waitForURL((url) => !url.includes('/login'));
  }
}
