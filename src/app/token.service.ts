import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'login_token'; 

  constructor() { }

  
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
