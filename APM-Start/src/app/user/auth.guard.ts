import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  Route,
  CanLoad
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLoggin(state.url);
  }

  canLoad(
    route: Route
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLoggin(route.path);
  }

  private checkLoggin(url: string): boolean {
    if (this.authService.isLoggedIn)
      return true;

    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }

}
