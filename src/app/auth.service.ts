import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://192.168.80.33:8092/api';

  private authToken:any =''; 



  constructor(private http: HttpClient,
    private token:TokenService) {}

  signUp(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/registration`, user);
  }
  createProject(create: any): Observable<any> {
   this.authToken= localStorage.getItem("login_token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.post(`${this.baseUrl}/create/project`, create,{headers});
  }
  jmxData(id: any): Observable<any> {
    this.authToken= localStorage.getItem("login_token");
     const headers = new HttpHeaders({
       Authorization: `Bearer ${this.authToken}`,
     });
     return this.http.post(`${this.baseUrl}/selected/projectlist`, id,{headers});
   }
  projectList(): Observable<any> {
    this.authToken= localStorage.getItem("login_token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.post(`${this.baseUrl}/user/projectlist`,null,{headers});
  }
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/account/login`, credentials
);
  }
}
