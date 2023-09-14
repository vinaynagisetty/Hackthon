import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://192.168.80.33:8080/api';

  constructor(private http: HttpClient) {}

  signUp(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/registration`, user);
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
