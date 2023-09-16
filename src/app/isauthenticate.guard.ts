import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(public token: TokenService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {

    if (this.token.getToken() == null) {
      this.router.navigate(['login']);
      return true;
    }else{

    return true;
    }
  }
}