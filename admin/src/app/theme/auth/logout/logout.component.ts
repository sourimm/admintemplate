import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../../services/auth.service';

import {ApiResponse} from '../../../models/ApiResponse';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.logout()
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.authService.removeLocalStorageAuthToken();
          this.router.navigate(['login']);
        }
      })
      .catch((error: any) => {});
  }
}
