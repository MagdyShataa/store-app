import { Injectable } from "@angular/core";
import { ProductDetails } from "src/app/product-list/service/product-service.service";

@Injectable({
  providedIn: "root",
})
export class CartServiceService {
  private items: ProductDetails[] = [];

  constructor() {
    this.loadCart();
  }

  saveCart(): void {
    localStorage.setItem("cartItems", JSON.stringify(this.items));
  }

  loadCart(): void {
    const savedItems = localStorage.getItem("cartItems");
    this.items = savedItems ? JSON.parse(savedItems) : [];
  }

  addToCart(product: ProductDetails): void {
    this.items.push(product);
    this.saveCart();
  }

  removeFromCart(index: number): void {
    this.items.splice(index, 1);
    this.saveCart();
  }

  clearCart(): void {
    this.items = [];
    localStorage.removeItem("cartItems");
  }

  getItems(): ProductDetails[] {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
}
