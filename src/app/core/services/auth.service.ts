import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UserRegistration } from "../models/user-registration.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'https://localhost:7128/api/auth';

  register(userData: UserRegistration) {
    return this.http.post(`${this.baseUrl}/registration`, userData);
  }

  login(userData: { email: string, password: string }): Observable<string> {
    return this.http.post<string>(
      `${this.baseUrl}/login`,
      userData,
      { responseType: 'text' as 'json' }
    );
  }
}