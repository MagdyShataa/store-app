import { Component, OnInit } from "@angular/core";
import {
  ProductDetails,
  ProductServiceService,
} from "../service/product-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { CartServiceService } from "src/app/cart/service/cart-service.service";

@Component({
  selector: "app-product-ditals",
  templateUrl: "./product-ditals.component.html",
  styleUrls: ["./product-ditals.component.scss"],
})
export class ProductDitalsComponent implements OnInit {
  product$: Observable<ProductDetails | null> = of(null); // Directly initializing with null
  error: string | null = null; // Track errors

  constructor(
    private productService: ProductServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    this.loadProductById();
  }

  private loadProductById(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get("id");
        const productId = id ? +id : null; // Convert string to number
        return this.getProduct(productId); // Fetch product details
      })
    );
  }

  // private getProduct(
  //   productId: number | null
  // ): Observable<ProductDetails | null> {
  //   if (productId && !isNaN(productId)) {
  //     return this.productService.getProductById(productId).pipe(
  //       map((product) => {
  //         if (product) {
  //           product.date = product.date || new Date(); // Ensure date is defined
  //         }
  //         return product;
  //       }),
  //       catchError((error) => {
  //         this.error = "Error loading product details"; // Set error message
  //         console.error(error); // Log error
  //         return of(null); // Return null observable
  //       })
  //     );
  //   }
  //   this.error = "Invalid product ID"; // Handle invalid ID
  //   return of(null); // Return null if productId is invalid
  // }

  private getProduct(
    productId: number | null
  ): Observable<ProductDetails | null> {
    if (productId && !isNaN(productId)) {
      return this.productService.getProductById(productId).pipe(
        catchError((error) => {
          this.error = "Error loading product details"; // Set error message
          console.error(error); // Log error
          return of(null); // Return null observable
        })
      );
    }
    this.error = "Invalid product ID"; // Handle invalid ID
    return of(null); // Return null if productId is invalid
  }

  addToCart(product: ProductDetails): void {
    this.cartService.addToCart(product);
    console.log("Product added to cart:", product);
    this.showNotification("Your product has been added to the cart!"); // Improved user feedback
  }

  private showNotification(message: string): void {
    window.alert(message); // Consider replacing with a toast notification for better UX
  }

  goBack(): void {
    this.router.navigate(["/product-list"]);
  }
}
