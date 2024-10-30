import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UserRegistration } from "../models/user-registration.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:5246/api/auth';

  register(userData: UserRegistration) {
    return this.http.post(`${this.baseUrl}/registration`, userData)
  }

  login(userData: {email: string, password: string}) {
    return this.http.post(`${this.baseUrl}/login`, userData)
  }
}