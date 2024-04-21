"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
var CartItem = /** @class */ (function () {
    function CartItem(food) {
        this.food = food;
        this.quantity = 1;
        this.price = this.food.price;
    }
    return CartItem;
}());
exports.CartItem = CartItem;
