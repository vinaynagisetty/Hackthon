import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  signUp(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`, {
      params: {
        email: credentials.email,
        password: credentials.password,
      },
    });
  }
}
