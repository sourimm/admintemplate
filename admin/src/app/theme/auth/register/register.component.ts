import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

import {IOption} from 'ng-select';

import {SelectOptionService} from '../../../shared/elements/select-option.service';
import {ApiService} from '../../../services/api.service';
import {AuthService} from '../../../services/auth.service';
import {ApiResponse} from '../../../models/ApiResponse';
import {NotifyService} from '../../../services/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = true;
  formProcessing = false;
  validationErrors: any;

  countries: Array<IOption> = this.selectOptionService.getCountries();

  constructor(public selectOptionService: SelectOptionService,
              private authService: AuthService,
              private apiService: ApiService,
              private notifyService: NotifyService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.registerForm = new FormGroup({
      'first_name': new FormControl('', []),
      'last_name': new FormControl('', []),
      'user_name': new FormControl('', []),
      'password': new FormControl('', []),
      'confirm_password': new FormControl('', []),
      'email': new FormControl('', []),
      'confirm_email': new FormControl('', []),
      'state': new FormControl('', []),
      'country': new FormControl('', []),
      'role': new FormControl('teacher', []),
    });
    this.loading = false;
  }

  submit() {
    const formData = this.registerForm.getRawValue();
    this.formProcessing = true;
    this.validationErrors = {};

    this.authService.registerTeacher(formData)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.notifyService.success(res.message);
          this.registerForm.reset();
          this.registerForm.controls['role'].setValue('teacher');
        } else {
          this.notifyService.error(res.message);
        }
        this.formProcessing = false;
      })
      .catch((error: any) => {
        this.formProcessing = false;
        if (error.status === 422) {
          this.validationErrors = error.error.errors;
        } else {
          this.notifyService.error(error);
        }
      });
  }
}
