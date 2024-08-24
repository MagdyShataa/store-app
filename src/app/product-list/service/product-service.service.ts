import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

export interface ProductDetails {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rate: number;
  count: number;
  quantity: number;
  date?: Date | string;
  rating: {
    rate: number;
    count: number;
  };
}
@Injectable({
  providedIn: "root",
})
export class ProductServiceService {
  private readonly baseUrl = "https://fakestoreapi.com/products";
  private readonly categoriesUrl = `${this.baseUrl}/categories`;
  private products: ProductDetails[] = [{
    date: "2024-01-01",
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rate: 0,
    count: 0,
    quantity: 0,
    rating: {
      rate: 0,
      count: 0
    }
  }];
  constructor(private http: HttpClient) {}

  // Get all products
  getAllProducts(): Observable<ProductDetails[]> {
    return this.http
      .get<ProductDetails[]>(this.baseUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get all categories
  getCategories(): Observable<string[]> {
    return this.http
      .get<string[]>(this.categoriesUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get products by category
  getProductsByCategory(category: string): Observable<ProductDetails[]> {
    return this.http
      .get<ProductDetails[]>(`${this.baseUrl}/category/${category}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get a single product by ID

  // getProductById(id: number): Observable<ProductDetails | null> {
  //   const product = this.products.find((p) => p.id === id);
  //   return of(product ? { ...product, date: product.date || new Date() } : null);
  // }








  getProductById(id: number): Observable<ProductDetails> {
    return this.http
      .get<ProductDetails>(`${this.baseUrl}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Create a new product
  createProduct(product: ProductDetails): Observable<ProductDetails> {
    return this.http
      .post<ProductDetails>(this.baseUrl, product)
      .pipe(catchError(this.handleError));
  }

  // Update an existing product
  updateProduct(
    id: number,
    product: ProductDetails
  ): Observable<ProductDetails> {
    return this.http
      .put<ProductDetails>(`${this.baseUrl}/${id}`, product)
      .pipe(catchError(this.handleError));
  }

  // Delete a product
  deleteProduct(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
