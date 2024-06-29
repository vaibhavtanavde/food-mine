import { browser, by, element, ExpectedConditions as EC, protractor } from 'protractor';

describe('Test Suite', () => {
    beforeEach(async () => {
    });

    it('should navigate to payment page', async () => {
        const FindMyLocation = element(by.css('.find-location'));
        console.log('Waiting for Find My Location button to be clickable');
        await browser.wait(EC.elementToBeClickable(FindMyLocation), 10000, 'Find My Location button not clickable');
        console.log('Clicking Find My Location button');
        await FindMyLocation.click();

        const mapElement = element(by.className('leaflet-container'));
        console.log('Waiting for map element to be clickable');
        await browser.wait(EC.elementToBeClickable(mapElement), 10000, 'Map element not clickable');
        console.log('Clicking map element');
        await mapElement.click();

        const GoToPayment = element(by.css('button[_ngcontent-ng-c3269807487]'));
        console.log('Waiting for Go To Payment button to be clickable');
        await browser.wait(EC.elementToBeClickable(GoToPayment), 10000, 'Go To Payment button not clickable');
        console.log('Clicking Go To Payment button');
        await GoToPayment.click();

        console.log('Waiting for URL to contain /payment');
        await browser.wait(EC.urlContains('http://localhost:4200/payment'), 10000, 'URL did not change to payment page');
        const currentUrl = await browser.getCurrentUrl();
        console.log('Current URL:', currentUrl);
        expect(currentUrl).toContain('http://localhost:4200/payment');
    });

    it('should remove the food item from cart', async () => {
        browser.get('http://localhost:4200/');
        await browser.sleep(2000); // This sleep might be necessary for the page to load

        const cartQuantity = element(by.css('a[routerlink="/cart-page"]'));
        console.log('Waiting for cart link to be clickable');
        await browser.wait(EC.elementToBeClickable(cartQuantity), 10000, 'Cart link not clickable');
        console.log('Clicking cart link');
        await cartQuantity.click();

        const Remove = element(by.css('button[_ngcontent-ng-c471533846]'));
        console.log('Waiting for Remove button to be clickable');
        await browser.wait(EC.elementToBeClickable(Remove), 10000, 'Remove button not clickable');
        console.log('Clicking Remove button');
        await Remove.click();

        console.log('Waiting for URL to contain /cart-page');
        await browser.wait(EC.urlContains('http://localhost:4200/cart-page'), 10000, 'URL did not change to cart page');
        const currentUrl = await browser.getCurrentUrl();
        console.log('Current URL:', currentUrl);
        expect(currentUrl).toContain('http://localhost:4200/cart-page');
    });

    it('should logout from website', async () => {
        const FoodMine = element(by.css('a.logo[routerlink="/"]'));
        console.log('Waiting for FoodMine logo to be clickable');
        await browser.wait(EC.elementToBeClickable(FoodMine), 10000, 'FoodMine logo not clickable');
        console.log('Clicking FoodMine logo');
        await FoodMine.click();

        const username = element(by.css('a[routerlink="/dashboard"]'));
        console.log('Waiting for username link to be clickable');
        await browser.wait(EC.elementToBeClickable(username), 10000, 'Username link not clickable');
        console.log('Clicking username link');
        await username.click();

        const Logout = element(by.linkText('Logout'));
        console.log('Waiting for Logout link to be clickable');
        await browser.wait(EC.elementToBeClickable(Logout), 10000, 'Logout link not clickable');
        console.log('Clicking Logout link');
        await Logout.click();

        console.log('Waiting for URL to contain /');
        await browser.wait(EC.urlContains('http://localhost:4200/'), 10000, 'URL did not change to home page');
        const currentUrl = await browser.getCurrentUrl();
        console.log('Current URL:', currentUrl);
        expect(currentUrl).toContain('http://localhost:4200/');
    });
});
