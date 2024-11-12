import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  userIdBehaviorSubject: BehaviorSubject<string | null>;

  private readonly TOKEN = 'token';
  private readonly USER_ID = 'userId';

  constructor() {
    this.userIdBehaviorSubject = new BehaviorSubject<string | null>(this.getUserId());
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.USER_ID);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN, token);
  }

  setUserId(userId: string): void {
    localStorage.setItem(this.USER_ID, userId);
    this.userIdBehaviorSubject.next(this.getUserId());
  }

  clear(): void {
    localStorage.clear();
    this.userIdBehaviorSubject.next(null);
  }
}