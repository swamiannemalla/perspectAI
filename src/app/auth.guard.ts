import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private dataService: DataService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // let url: string = state.url;
      return this.checkLogin();
    }

    checkLogin(): boolean {
      if (this.dataService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
      // return false;
    }
}
