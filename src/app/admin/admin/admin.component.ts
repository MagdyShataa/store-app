import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CartServiceService } from "src/app/cart/service/cart-service.service";
import { ProductDetails } from "src/app/product-list/service/product-service.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent {
  theme: string = this.getPreferredTheme();
  adminTitle: string = "Admin Dashboard";
  items: ProductDetails[] = [];
  total: number = 0;

  constructor(private cartService: CartServiceService) {}

  ngOnInit(): void {
    this.applyTheme(this.theme);
    this.loadCartItems();
    this.updateTotal();
    this.fetchAdminData();
  }

  toggleTheme(): void {
    this.theme = this.theme === "light" ? "dark" : "light";
    this.setStoredTheme(this.theme);
    this.applyTheme(this.theme);
  }

  private applyTheme(theme: string): void {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }

  private getStoredTheme(): string | null {
    return localStorage.getItem("theme");
  }

  private setStoredTheme(theme: string): void {
    localStorage.setItem("theme", theme);
  }

  private getPreferredTheme(): string {
    const storedTheme = this.getStoredTheme();
    return storedTheme
      ? storedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  fetchAdminData(): void {
    // Placeholder for method to fetch admin-related data
    console.log("Fetching admin data...");
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

  getTotal(): number {
    return this.total;
  }
}
// onSubmit(): void {
//   if (this.checkoutForm.valid) {
//     this.cartService.clearCart();
//     console.warn("Your order has been submitted", this.checkoutForm.value);
//     this.checkoutForm.reset();
//     this.updateTotal();
//   }
// }

// constructor(
//   private cartService: CartServiceService,
// private formBuilder: FormBuilder
// ) {
// this.checkoutForm = this.formBuilder.group({
//   name: "",
//   address: "",
// });
// }
// checkoutForm: FormGroup;
