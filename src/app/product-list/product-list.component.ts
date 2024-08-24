import { Component, OnInit } from "@angular/core";
import {
  ProductDetails,
  ProductServiceService,
} from "./service/product-service.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  products: ProductDetails[] = [];
  categories: string[] = [];
  errorMessage: string = "";



  addToCard() {
    console.log(this.products);
  }

  constructor(private productService: ProductServiceService) {}


  ngOnInit(): void {
    this.loadCategories();
    this.loadAllProducts();
  }



  private loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => (this.categories = categories),
      error: (err) => this.handleError(err),
    });
  }




  private loadAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => this.handleError(err),
    });
  }




  onCategoryChange(event: Event): void {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    if (selectedCategory) {
      this.productService.getProductsByCategory(selectedCategory).subscribe({
        next: (data) => (this.products = data),
        error: (err) => this.handleError(err),
      });
    } else {
      this.loadAllProducts();
    }
  }




  private handleError(error: string): void {
    this.errorMessage = error;
    console.error("An error occurred: ", error);
  }
}
