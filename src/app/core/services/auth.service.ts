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

  register(userData: UserRegistration): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/registration`, userData);
  }

  login(userData: { email: string, password: string }): Observable<LogInResponse> {
    return this.http.post<LogInResponse>(`${this.baseUrl}/auth/login`, userData);
  }

  verifyEmail(token: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/auth/email-verification/${token}`);
  }
}