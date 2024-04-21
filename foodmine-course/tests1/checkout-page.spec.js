"use strict";
//checkout-page.spec.ts
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
describe('CheckoutPageComponent', function () {
    beforeEach(function () {
        protractor_1.browser.sleep(2000); // Assuming '/checkout' is the route for checkout page
    });
    it('should initialize component with default values', function () { return __awaiter(void 0, void 0, void 0, function () {
        var nameInput, addressInput, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    (0, protractor_1.element)(protractor_1.by.css('a[ng-reflect-router-link="/checkout"]')).click(); // Proceed to Cart button
                    protractor_1.browser.sleep(2000);
                    nameInput = (0, protractor_1.element)(protractor_1.by.css('input[placeholder="Name"]'));
                    addressInput = (0, protractor_1.element)(protractor_1.by.css('input[placeholder="Address"]'));
                    // Validate default values
                    _a = expect;
                    return [4 /*yield*/, nameInput.getAttribute('value')];
                case 1:
                    // Validate default values
                    _a.apply(void 0, [_c.sent()]).toBe('John Doe'); // Assuming 'John Doe' is the default name
                    _b = expect;
                    return [4 /*yield*/, addressInput.getAttribute('value')];
                case 2:
                    _b.apply(void 0, [_c.sent()]).toBe('123 Street, City');
                    protractor_1.browser.sleep(5000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Error message capture', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createOrder, toastMessageText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createOrder = (0, protractor_1.element)(protractor_1.by.css('button[_ngcontent-ng-c1064162151]'));
                    return [4 /*yield*/, createOrder.click()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf((0, protractor_1.element)(protractor_1.by.xpath("//div[@aria-label='Please select your location on the map']"))), 5000)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, protractor_1.element)(protractor_1.by.xpath("//div[@aria-label='Please select your location on the map']")).getText()];
                case 3:
                    toastMessageText = _a.sent();
                    // Assert that the captured text is what you expect
                    expect(toastMessageText).toEqual('Please select your location on the map');
                    console.log("Got the error message");
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create order on valid form submission', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mapElement, createOrder, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    mapElement = (0, protractor_1.element)(protractor_1.by.className('leaflet-container'));
                    return [4 /*yield*/, mapElement.click()];
                case 1:
                    _b.sent();
                    protractor_1.browser.sleep(2000);
                    createOrder = (0, protractor_1.element)(protractor_1.by.css('button[_ngcontent-ng-c1064162151]'));
                    // Click create order button
                    return [4 /*yield*/, createOrder.click()];
                case 2:
                    // Click create order button
                    _b.sent();
                    protractor_1.browser.sleep(2000);
                    // Wait for navigation to payment page
                    return [4 /*yield*/, protractor_1.browser.wait(protractor_1.ExpectedConditions.urlContains('/payment'), 5000)];
                case 3:
                    // Wait for navigation to payment page
                    _b.sent();
                    // Assert the URL is correct
                    _a = expect;
                    return [4 /*yield*/, protractor_1.browser.getCurrentUrl()];
                case 4:
                    // Assert the URL is correct
                    _a.apply(void 0, [_b.sent()]).toContain('/payment');
                    console.log("Checkout page test passed");
                    return [2 /*return*/];
            }
        });
    }); });
});
