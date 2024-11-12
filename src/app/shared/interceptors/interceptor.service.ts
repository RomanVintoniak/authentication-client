import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { LocalStorageService } from "../../core/services/local-storage.service";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class InterceptorService implements HttpInterceptor {
  localStorageService = inject(LocalStorageService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getToken();
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}