import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {NotifyService} from '../../../services/notify.service';
import {ApiResponse} from '../../../models/ApiResponse';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  token: string;
  labels = {};

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private toast: NotifyService  ) { }

  ngOnInit() {
    this.token = this.route.snapshot.params['token'];
    window.scrollTo(0, 0);

    setTimeout(() => {
      this.tokenVerification();
    }, 2000);
  }

  private tokenVerification() {
    this.authService.verifyEmail(this.token)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.toast.success(res.message);

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);

        } else {
          this.toast.error(res.message);
          setTimeout(() => {
            this.router.navigate(['/register']);
          }, 2000);
        }
      })
      .catch((error: any) => {});
  }
}
