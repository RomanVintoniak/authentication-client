import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  get(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`)
  }
}