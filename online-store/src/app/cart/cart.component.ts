import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: string[] = [];

  addToCart(item: string): void {
    this.cartItems.push(item);
    console.log(item + ' added to cart.');
  }

  removeFromCart(item: string): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      console.log(item + ' removed from cart.');
    } else {
      console.log(item + ' is not in the cart.');
    }
  }

  viewCart(): void {
    console.log('Items in cart:');
    this.cartItems.forEach(item => {
      console.log(item);
    });
  }
}
