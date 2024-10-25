import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UserRegistration } from "../models/user-registration.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:5246/api/auth';

  register(userDat: UserRegistration): Observable<any> {
    return this.http.post(`${this.baseUrl}/registration`, userDat)
  }
}