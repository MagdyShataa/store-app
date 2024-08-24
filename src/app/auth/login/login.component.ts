import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  message = this.getMessage(); // Initialize message directly

  constructor(public authService: AuthService, public router: Router) {}

  getMessage(): string {
    return "Logged " + (this.authService.isLoggedIn ? "in" : "out");
  }

  login(): void {
    this.message = "Trying to log in ...";

    this.authService.login().subscribe(() => {
      this.message = this.getMessage();
      if (this.authService.isLoggedIn) {
        const redirectUrl = this.authService.redirectUrl || "/admin"; // Use redirect URL if available
        this.router.navigate([redirectUrl]);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.message = this.getMessage();
  }
}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {

// }
