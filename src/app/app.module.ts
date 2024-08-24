import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CommonModule, NgOptimizedImage } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "./nav-bar/nav-bar.component";
import { ProductListModule } from "./product-list/product-list.module";
import { CartModule } from "./cart/cart.module";
import { HttpClientModule } from "@angular/common/http";
import { AdminModule } from "./admin/admin.module";
import { LoginComponent } from './auth/login/login.component';
@NgModule({
  declarations: [AppComponent, NavbarComponent, LoginComponent],
  imports: [
    BrowserModule,
    ProductListModule,
    CartModule,
    AdminModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
