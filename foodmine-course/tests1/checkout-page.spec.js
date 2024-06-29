"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
describe('Test Suite', function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    }); });
    it('should navigate to payment page', function () { return __awaiter(void 0, void 0, void 0, function () {
        var FindMyLocation, mapElement, GoToPayment, currentUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    FindMyLocation = (0, protractor_1.element)(protractor_1.by.css('.find-location'));
                    console.log('Waiting for Find My Location button to be clickable');
                    return [4 /*yield*/, protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(FindMyLocation), 10000, 'Find My Location button not clickable')];
                case 1:
                    _a.sent();
                    console.log('Clicking Find My Location button');
                    return [4 /*yield*/, FindMyLocation.click()];
                case 2:
                    _a.sent();
                    mapElement = (0, protractor_1.element)(protractor_1.by.className('leaflet-container'));
                    console.log('Waiting for map element to be clickable');
                    return [4 /*yield*/, protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(mapElement), 10000, 'Map element not clickable')];
                case 3:
                    _a.sent();
                    console.log('Clicking map element');
                    return [4 /*yield*/, mapElement.click()];
                case 4:
                    _a.sent();
                    GoToPayment = (0, protractor_1.element)(protractor_1.by.css('button[_ngcontent-ng-c3269807487]'));
                    console.log('Waiting for Go To Payment button to be clickable');
                    return [4 /*yield*/, protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(GoToPayment), 10000, 'Go To Payment button not clickable')];
                case 5:
                    _a.sent();
                    console.log('Clicking Go To Payment button');
                    return [4 /*yield*/, GoToPayment.click()];
                case 6:
                    _a.sent();
                    console.log('Waiting for URL to contain /payment');
                    return [4 /*yield*/, protractor_1.browser.wait(protractor_1.ExpectedConditions.urlContains('http://localhost:4200/payment'), 10000, 'URL did not change to payment page')];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.getCurrentUrl()];
                case 8:
                    currentUrl = _a.sent();
                    console.log('Current URL:', currentUrl);
                    expect(currentUrl).toContain('http://localhost:4200/payment');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should remove the food item from cart', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cartQuantity, Remove, currentUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protractor_1.browser.get('http://localhost:4200/');
                    return [4 /*yield*/, protractor_1.browser.sleep(2000)];
                case 1:
                    _a.sent(); // This sleep might be necessary for the page to load
                    cartQuantity = (0, protractor_1.element)(protractor_1.by.css('a[routerlink="/cart-page"]'));
                    console.log('Waiting for cart link to be clickable');
                    return [4 /*yield*/, protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(cartQuantity), 10000, 'Cart link not clickable')];
                case 2:
                    _a.sent();
                    console.log('Clicking cart link');
                    return [4 /*yield*/, cartQuantity.click()];
                case 3:
                    _a.sent();
                    Remove = (0, protractor_1.element)(protractor_1.by.css('button[_ngcontent-ng-c471533846]'));
                    console.log('Waiting for Remove button to be clickable');
                    return [4 /*yield*/, protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(Remove), 10000, 'Remove button not clickable')];
                case 4:
                    _a.sent();
                    console.log('Clicking Remove button');
                    return [4 /*yield*/, Remove.click()];
                case 5:
                    _a.sent();
                    console.log('Waiting for URL to contain /cart-page');
                    return [4 /*yield*/, protractor_1.browser.wait(protractor_1.ExpectedConditions.urlContains('http://localhost:4200/cart-page'), 10000, 'URL did not change to cart page')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.getCurrentUrl()];
                case 7:
                    currentUrl = _a.sent();
                    console.log('Current URL:', currentUrl);
                    expect(currentUrl).toContain('http://localhost:4200/cart-page');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should logout from website', function () { return __awaiter(void 0, void 0, void 0, function () {
        var FoodMine, username, Logout, currentUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    FoodMine = (0, protractor_1.element)(protractor_1.by.css('a.logo[routerlink="/"]'));
                    console.log('Waiting for FoodMine logo to be clickable');
                    return [4 /*yield*/, protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(FoodMine), 10000, 'FoodMine logo not clickable')];
                case 1:
                    _a.sent();
                    console.log('Clicking FoodMine logo');
                    return [4 /*yield*/, FoodMine.click()];
                case 2:
                    _a.sent();
                    username = (0, protractor_1.element)(protractor_1.by.css('a[routerlink="/dashboard"]'));
                    console.log('Waiting for username link to be clickable');
                    return [4 /*yield*/, protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(username), 10000, 'Username link not clickable')];
                case 3:
                    _a.sent();
                    console.log('Clicking username link');
                    return [4 /*yield*/, username.click()];
                case 4:
                    _a.sent();
                    Logout = (0, protractor_1.element)(protractor_1.by.linkText('Logout'));
                    console.log('Waiting for Logout link to be clickable');
                    return [4 /*yield*/, protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(Logout), 10000, 'Logout link not clickable')];
                case 5:
                    _a.sent();
                    console.log('Clicking Logout link');
                    return [4 /*yield*/, Logout.click()];
                case 6:
                    _a.sent();
                    console.log('Waiting for URL to contain /');
                    return [4 /*yield*/, protractor_1.browser.wait(protractor_1.ExpectedConditions.urlContains('http://localhost:4200/'), 10000, 'URL did not change to home page')];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.getCurrentUrl()];
                case 8:
                    currentUrl = _a.sent();
                    console.log('Current URL:', currentUrl);
                    expect(currentUrl).toContain('http://localhost:4200/');
                    return [2 /*return*/];
            }
        });
    }); });
});
