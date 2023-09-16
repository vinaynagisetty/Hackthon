import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://192.168.0.106:8085/api';

  



  constructor(private http: HttpClient) {}

  signUp(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/registration`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/account/login`, credentials
);
  }
}
