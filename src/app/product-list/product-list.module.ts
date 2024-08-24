import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";

import { ProductListRoutingModule } from "./product-list-routing.module";
import { ProductListComponent } from "./product-list.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CartModule } from "../cart/cart.module";
import { ProductDitalsComponent } from "./product-ditals/product-ditals.component";

@NgModule({
  declarations: [ProductListComponent, ProductDitalsComponent],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    HttpClientModule,
    RouterModule,
    NgOptimizedImage 
  ],
})
export class ProductListModule {}
