import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UserRegistration } from "../models/user-registration.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { LogInResponse } from "../models/auth/log-in-response.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  register(userData: UserRegistration) {
    return this.http.post(`${this.baseUrl}/auth/registration`, userData);
  }

  login(userData: { email: string, password: string }): Observable<LogInResponse> {
    return this.http.post<LogInResponse>(`${this.baseUrl}/auth/login`, userData);
  }
}