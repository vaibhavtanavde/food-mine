// cart.js - Contains cart functionality

let cartItems = [];

function addToCart(item) {
    cartItems.push(item);
    console.log(item + ' added to cart.');
}

function removeFromCart(item) {
    const index = cartItems.indexOf(item);
    if (index !== -1) {
        cartItems.splice(index, 1);
        console.log(item + ' removed from cart.');
    } else {
        console.log(item + ' is not in the cart.');
    }
}

function viewCart() {
    console.log('Items in cart:');
    cartItems.forEach(item => {
        console.log(item);
    });
}

module.exports = {
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    viewCart: viewCart
};
