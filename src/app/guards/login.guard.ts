import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(public router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let control = localStorage.getItem('control_token');
    let token = localStorage.getItem('access_token');
    try
    {
      if( atob(control) == token  && token != '' && token != null )
      {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } catch(error) {
      this.router.navigate(['/login']);
      return false;
    }
    
  }
  
}
