import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "../services/local-storage.service";

export const authGuard = () => {
  const localStorageService = inject(LocalStorageService)
  const router = inject(Router);

  if (localStorageService.getToken()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
}