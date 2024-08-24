import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log("authGuard#canActivate called");
  if (authService.isLoggedIn) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl("/login");
};
