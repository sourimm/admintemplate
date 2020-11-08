import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {AuthService} from './auth.service';
import {UserService} from './user.service';
import {GeneralService} from './general.service';
import {ApiResponse} from '../models/ApiResponse';

@Injectable()
export class AuthGuard implements CanActivate {
  isUserAuthenticated = false;

  constructor(private router: Router,
              private userService: UserService,
              private generalService: GeneralService,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this.userService.fullName = 'Admin';
    // this.userService.avatar = 'assets/images/blank.png';
    // return true;
    if (this.authService.isLoggedIn()) {
      return this.validate().then((validate: boolean) => {
        return validate;
      }).catch((validate: boolean) => {
        return validate;
      });
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  validate() {
    return new Promise((resolve, reject) => {
      this.generalService.validate()
        .then((res: ApiResponse) => {
          if (res.status === true) {
            this.isUserAuthenticated = true;
            // some comment
            // this.generalService.sidebarMenuLabels = res.labels || {};
            // this.userService.userCurrentLang = res.current_language;
            // this.userService.userLang.emit(res.current_language);
            this.userService.userType = res.data.user.role;
            this.userService.fullName = 'Admin';
            this.userService.avatar = 'assets/images/blank.png';
            this.userService.createMenuItems(res.data.menu_items);
            this.userService.accessRoles = res.data.access_roles;
            resolve(true);
          }
          resolve(false);
        })
        .catch(error => {
          reject(false);
        });
    });
  }
}
