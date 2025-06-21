export class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async clickFindLocation() {
    await this.page.locator('.find-location').click();
  }

  async clickMap() {
    await this.page.locator('.leaflet-container').click();
  }

  async clickGoToPayment() {
    await this.page.getByRole('button', { name: 'Go To Payment' }).click();
    await this.page.waitForURL('**/payment');
  }

  async goToCartPage() {
    await this.page.click('a[routerlink="/cart-page"]');
  }

  async removeItem() {
    await this.page.locator('button[_ngcontent-ng-c471533846]').click();
  }
}
