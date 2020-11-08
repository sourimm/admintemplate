import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {UserService} from './user.service';

@Injectable()
export class ContentManagerGuard implements CanActivate {

  constructor(private router: Router,
              private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if ((this.userService.userType === '4') || (this.userService.userType === '1')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
