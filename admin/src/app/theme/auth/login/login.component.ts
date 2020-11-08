import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {ApiResponse} from '../../../models/ApiResponse';
import {AuthService} from '../../../services/auth.service';
import {ApiService} from '../../../services/api.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formProcessing = false;
  labels = {};
  captchaResp: string;

  respMessage: string = null;
  respMessageType: string = null;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');

    this.initForm();
  }

  private initForm() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [
        Validators.required
      ]),
      'password': new FormControl(null, [
        Validators.required
      ]),
     'captcha': new FormControl(null, [
        //Validators.required
      ]),
    });
  }

  submit() {
    if (this.loginForm.valid !== true) {
      return false;
    }
    this.respMessage = null;
    this.formProcessing = true;

    const formData = this.loginForm.value;
    const username = formData.username;
    const password = formData.password;
    //const captcha = formData.captcha;
    const captcha = 'abc';

    this.authService.sendLoginFormData(username, password, captcha)
      .then(
        (res: ApiResponse) => {
          this.responseApiNext(res);
        }
      )
      .catch((error: any) => {
        this.loginForm.controls['captcha'].reset();
        this.responseApiError(error);
      });
  }

  private responseApiNext(res) {
    if (res.status === true) {
      // this.formProcessing = false;
      if (res.data.isOTPEnabled) {
        const token_object = {
          'auth_token': res.data.auth_token,
          'otp': false
        };
        this.authService.saveLocalStorageAuthToken(token_object);
        this.apiService.authToken = res.data.auth_token;
        this.router.navigate(['/auth/otp']);
      } else {
        const token_object = {
          'auth_token': res.data.auth_token,
          'otp': true
        };
        this.authService.saveLocalStorageAuthToken(token_object);
        this.respMessageType = 'success';
        this.respMessage = res.message;
        this.userService.createMenuItems(res.data.menu_items);
        setTimeout(
          () => {
            if (res.data.user_role === '4') {
              this.router.navigate(['/website/home/']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          }, 2000
        );
      }
    } else {
      this.loginForm.controls['captcha'].reset();
      this.respMessageType = 'danger';
      this.respMessage = res.message;
      this.formProcessing = false;
    }
  }

  private responseApiError(error) {
    if (error.status === 422) {
      this.respMessageType = 'danger';
      this.respMessage = error.error.data;
    } else {
      this.apiService.handleError(error, true);
      this.respMessageType = 'danger';
      this.respMessage = error.error.message;
    }
    this.formProcessing = false;
  }

  resolved(captchaResponse: string) {
    this.captchaResp = captchaResponse;
  }
}
