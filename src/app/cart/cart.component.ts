import { Component } from "@angular/core";
import { ProductDetails } from "../product-list/service/product-service.service";
import { CartServiceService } from "./service/cart-service.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent {
  items: ProductDetails[] = [];
  checkoutForm: FormGroup;
  total: number = 0;

  constructor(
    private cartService: CartServiceService,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: "",
      address: "",
    });
  }

  ngOnInit(): void {
    this.loadCartItems();
    this.updateTotal();
  }

  private loadCartItems(): void {
    this.items = this.cartService.getItems();
  }

  private updateTotal(): void {
    this.total = this.cartService.getTotal();
  }

  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
    this.loadCartItems();
    this.updateTotal();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCartItems();
    this.updateTotal();
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      this.cartService.clearCart();
      console.warn("Your order has been submitted", this.checkoutForm.value);
      this.checkoutForm.reset();
      this.updateTotal();
    }
  }

  getTotal(): number {
    return this.total;
  }
}
