import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { authGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "product-list",
    loadChildren: () =>
      import("./product-list/product-list.module").then(
        (m) => m.ProductListModule
      ),
  },
  {
    path: "cart",
    loadChildren: () => import("./cart/cart.module").then((m) => m.CartModule),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
    canMatch: [authGuard],
  },
  {
    path: "**",
    redirectTo: "product-list",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
