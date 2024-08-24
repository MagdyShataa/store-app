import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./product-list.component";
import { ProductDitalsComponent } from "./product-ditals/product-ditals.component";

const routes: Routes = [
  { path: "", component: ProductListComponent },

  { path: "product-ditals/:id", component: ProductDitalsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductListRoutingModule {}
